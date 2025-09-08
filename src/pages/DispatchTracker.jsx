import React, { useState, useEffect, useRef } from 'react';


const DispatchTracker = () => {
  const [trackingId, setTrackingId] = useState('');
  const [dispatch, setDispatch] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // eta now stored as seconds (number) or null
  const [eta, setEta] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const wsRef = useRef(null);
  const geoWatchIdRef = useRef(null);

  // helper: haversine distance (km)
  const haversineKm = (a, b) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const aHarv = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
    return R * c;
  };

  // compute ETA in minutes using device location -> rider location with a default average speed
  const computeEtaMinutes = (from, to, speedKmh = 30) => {
    if (!from || !to) return null;
    const dKm = haversineKm(from, to);
    if (dKm === 0) return 0;
    const hours = dKm / speedKmh;
    return Math.max(1, Math.ceil(hours * 60));
  };

  // format seconds into "mo w d h m s"
  const formatDurationSeconds = (seconds) => {
    if (seconds == null || Number.isNaN(Number(seconds))) return 'N/A';
    let s = Math.max(0, Math.floor(Number(seconds)));

    const units = [
      { label: 'mo', val: 30 * 24 * 3600 },
      { label: 'w',  val: 7 * 24 * 3600 },
      { label: 'd',  val: 24 * 3600 },
      { label: 'h',  val: 3600 },
      { label: 'm',  val: 60 },
      { label: 's',  val: 1 },
    ];

    const parts = [];
    for (const u of units) {
      const q = Math.floor(s / u.val);
      if (q > 0) {
        parts.push(`${q}${u.label}`);
        s -= q * u.val;
      }
    }
    return parts.length ? parts.join(' ') : '0s';
  };

  // watch device GPS
  useEffect(() => {
    if ('geolocation' in navigator) {
      try {
        geoWatchIdRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setUserLocation(loc);
          },
          (err) => {
            console.warn('Geolocation watch error', err);
          },
          { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
        );
      } catch (e) {
        console.warn('Geolocation watch failed', e);
      }
    }
    return () => {
      if (geoWatchIdRef.current != null && navigator.geolocation) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
        geoWatchIdRef.current = null;
      }
    };
  }, []);

  // recompute ETA whenever userLocation or rider map coords change
  useEffect(() => {
    const riderCoords = dispatch?._mapCoords ?? (dispatch?.rider ? { lat: Number(dispatch.rider.latitude) || 0, lng: Number(dispatch.rider.longitude) || 0 } : null);
    if (userLocation && riderCoords && riderCoords.lat && riderCoords.lng) {
      const minutes = computeEtaMinutes(userLocation, riderCoords);
      if (minutes != null) setEta(minutes * 60); // store seconds
    }
  }, [userLocation, dispatch]);

  // Load keyless maps script if needed and initialize map
  useEffect(() => {
    const initMapIfReady = () => {
      if (mapRef.current && !mapInstanceRef.current && window.google && window.google.maps) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 9.082, lng: 8.6753 },
          zoom: 6,
        });
      }
    };

    if (window.google && window.google.maps) {
      initMapIfReady();
      return;
    }

    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@v7.1/mapsJavaScriptAPI.js';
      script.async = true;
      script.defer = true;
      script.onload = () => initMapIfReady();
      document.head.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        initMapIfReady();
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // cleanup websocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (geoWatchIdRef.current != null && navigator.geolocation) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
        geoWatchIdRef.current = null;
      }
    };
  }, []);

  // connect to rider websocket for realtime updates
  const connectRiderWs = (riderId) => {
    if (!riderId) return;

    // close existing
    if (wsRef.current) {
      try { wsRef.current.close(); } catch (e) {}
      wsRef.current = null;
    }

    const wsUrl = `ws://localhost:8000/ws/riders/${riderId}/`;
    console.info('Connecting Rider WS ->', wsUrl);

    try {
      wsRef.current = new WebSocket(wsUrl);
    } catch (err) {
      console.error('WS open error', err);
      setError('WebSocket connection failed');
      return;
    }

    wsRef.current.onopen = () => {
      console.info('Rider WS connected', riderId);
      setError(null);
    };

    wsRef.current.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        // support different payload keys
        let lat = parseFloat(payload.latitude ?? payload.lat ?? payload.lat_deg ?? 0) || 0;
        let lng = parseFloat(payload.longitude ?? payload.lng ?? payload.lon ?? 0) || 0;

        // auto-fix sign if needed
        if (lng > 0 && lat > 0 && lat < 50) {
          lng = -lng;
        }

        // update marker on map
        if (mapInstanceRef.current) {
          const position = { lat, lng };
          if (!riderMarkerRef.current) {
            riderMarkerRef.current = new window.google.maps.Marker({
              position,
              map: mapInstanceRef.current,
              title: dispatch?.rider?.username || 'Rider',
            });
          } else {
            riderMarkerRef.current.setPosition(position);
          }
          mapInstanceRef.current.setCenter(position);
        }

        // update dispatch state
        setDispatch(prev => prev ? { ...prev, _mapCoords: { lat, lng }, rider: { ...prev.rider, latitude: lat, longitude: lng } } : prev);

        // compute ETA using device location if available, otherwise use payload
        const riderCoords = { lat, lng };
        if (userLocation) {
          const minutes = computeEtaMinutes(userLocation, riderCoords);
          if (minutes != null) {
            setEta(minutes * 60); // store seconds
          }
        } else {
          // normalize ETA: support eta_seconds, eta_minutes, eta
          if (payload.eta_seconds !== undefined && payload.eta_seconds !== null) {
            setEta(Number(payload.eta_seconds) || 0);
          } else if (payload.eta_minutes !== undefined && payload.eta_minutes !== null) {
            setEta((Number(payload.eta_minutes) || 0) * 60);
          } else if (payload.eta !== undefined && payload.eta !== null) {
            // assume payload.eta is minutes if numeric
            const n = Number(payload.eta);
            setEta(!Number.isNaN(n) ? n * 60 : payload.eta);
          }
        }
      } catch (err) {
        console.error('Error parsing WS message', err);
      }
    };

    wsRef.current.onerror = (err) => {
      console.error('Rider WS error', err);
    };

    wsRef.current.onclose = (ev) => {
      console.info('Rider WS closed', ev);
      wsRef.current = null;
    };
  };

  const searchDispatch = async () => {
    if (!trackingId.trim()) {
      setError('Enter a tracking ID!');
      setDispatch(null);
      return;
    }

    setLoading(true);
    setError(null);
    setEta(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/dispatches/search/${trackingId}`);
      if (!res.ok) throw new Error('Not found');

      const data = await res.json();
      const dispatchData = Array.isArray(data) ? data[0] : data;

      if (!dispatchData) {
        setError('No dispatch found.');
        setDispatch(null);
        return;
      }

      // Normalize coords and auto-fix sign (same logic as provided HTML)
      let lat = parseFloat(dispatchData.rider?.latitude || 0) || 0;
      let lng = parseFloat(dispatchData.rider?.longitude || 0) || 0;
 

      // Update map marker
      if (mapInstanceRef.current) {
        const position = { lat, lng };

        if (!riderMarkerRef.current) {
          riderMarkerRef.current = new window.google.maps.Marker({
            position,
            map: mapInstanceRef.current,
            title: dispatchData.rider?.username || 'Rider',
          });
        } else {
          riderMarkerRef.current.setPosition(position);
        }

        mapInstanceRef.current.setCenter(position);
        mapInstanceRef.current.setZoom(13);
      }

      setDispatch({ ...dispatchData, _mapCoords: { lat, lng } });

      // set ETA from API response if present (normalize to seconds)
      const apiEtaRaw = dispatchData.eta_seconds ?? dispatchData.eta_minutes ?? dispatchData.eta ?? dispatchData.rider?.eta_seconds ?? dispatchData.rider?.eta_minutes ?? dispatchData.rider?.eta;
      if (apiEtaRaw !== undefined && apiEtaRaw !== null) {
        if (dispatchData.eta_seconds ?? dispatchData.rider?.eta_seconds) {
          const secs = Number(dispatchData.eta_seconds ?? dispatchData.rider?.eta_seconds) || 0;
          setEta(secs);
        } else if (dispatchData.eta_minutes ?? dispatchData.rider?.eta_minutes) {
          const mins = Number(dispatchData.eta_minutes ?? dispatchData.rider?.eta_minutes) || 0;
          setEta(mins * 60);
        } else {
          const n = Number(apiEtaRaw);
          setEta(!Number.isNaN(n) ? n * 60 : apiEtaRaw);
        }
      } else {
        setEta(null);
      }

      // if device location available compute ETA using GPS (override API ETA)
      if (userLocation) {
        const minutes = computeEtaMinutes(userLocation, { lat, lng });
        if (minutes != null) setEta(minutes * 60);
      }

      // connect websocket using rider id from details
      const riderId = dispatchData.rider?.id ?? dispatchData.rider?.pk ?? dispatchData.rider?.user_id ?? dispatchData.rider?.uuid ?? null;
      if (riderId) {
        connectRiderWs(riderId);
      } else {
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
      }
    } catch (err) {
      setError('Error fetching dispatch: ' + err.message);
      setDispatch(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchDispatch();
    }
  };

  // responsive CSS used by the component
  const responsiveStyles = `
    .dt-root { height: 100vh; display: flex; flex-direction: column; font-family: Arial, sans-serif; }
    .dt-header { background: #2563eb; color: #fff; padding: 16px; text-align: center; }
    .dt-main { display: flex; flex-direction: column; flex: 1; background: #f9fafb; }
    .dt-map { width: 100%; height: 50vh; border-bottom: 1px solid #e5e7eb; }
    .dt-panel { padding: 16px; overflow: auto; background: white; }
    .dt-search { display: flex; gap: 8px; margin-bottom: 12px; }
    .dt-search input { flex: 1; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; }
    .dt-search button { padding: 8px 12px; background: #f60505ff; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    .dt-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px; background: #f9fafb; }
    .dt-badge { display:inline-block; padding:4px 8px; border-radius:6px; font-size:12px; font-weight:bold; color:#fff; }
    /* larger screens: map left, details right */
    @media(min-width: 768px) {
      .dt-main { flex-direction: row; }
      .dt-map { height: 100%; width: calc(100% - 400px); border-right: 1px solid #e5e7eb; border-bottom: none; }
      .dt-panel { width: 400px; height: 100%; }
    }
  `;

  return (
    <div className="dt-root mt-8">
      <style dangerouslySetInnerHTML={{ __html: responsiveStyles }} />
      <header className="dt-header">
        <h1 style={{ margin: 0 }}>📦 TXpress Dispatch Tracker</h1>
      </header>

      <main className="dt-main">
        {/* Map area */}
        <div ref={mapRef} id="map" className="dt-map" />

        {/* Info panel */}
        <aside className="dt-panel">
          <div className="dt-search">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Tracking ID (e.g. TRK-A6GARII3)"
            />
            <button onClick={searchDispatch} disabled={loading}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>

          <div id="dispatchDetails">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!dispatch && !error && <p>Enter a tracking ID to view details.</p>}

            {dispatch && (
              <>
                <div className="dt-card">
                  <h3>Tracking ID: {dispatch.tracking_id}</h3>
                  <span className="dt-badge" style={{ background: '#2563eb' }}>{dispatch.status}</span>
                </div>

                <div className="dt-card">
                  <h4>Rider</h4>
                  <p><strong>Name:</strong> {dispatch.rider?.username || 'N/A'}</p>
                  <p><strong>Email:</strong> {dispatch.rider?.email || 'N/A'}</p>
                  <p><strong>Coordinates:</strong> {dispatch._mapCoords?.lat ?? dispatch.rider?.latitude ?? 'N/A'}, {dispatch._mapCoords?.lng ?? dispatch.rider?.longitude ?? 'N/A'}</p>
                  <p><strong>ETA:</strong> {eta != null ? formatDurationSeconds(eta) : 'N/A'}</p>
                  <p style={{ fontSize: 12, color: '#6b7280' }}>{userLocation ? 'ETA computed from your device location' : 'Enable device location for ETA'}</p>
                </div>

                <div className="dt-card">
                  <h4>Sender</h4>
                  <p><strong>Email:</strong> {dispatch.sender_email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {dispatch.sender_phone_number || 'N/A'}</p>
                </div>

                <div className="dt-card">
                  <h4>Recipient</h4>
                  <p><strong>Name:</strong> {dispatch.recipient_name || 'N/A'}</p>
                  <p><strong>Phone:</strong> {dispatch.destination_phone_number || 'N/A'}</p>
                </div>

                <div className="dt-card">
                  <h4>Pickup Location</h4>
                  <p>{dispatch.pickup_location?.address || 'N/A'}</p>
                </div>

                <div className="dt-card">
                  <h4>Destination</h4>
                  <p>{dispatch.destination_location?.address || 'N/A'}</p>
                </div>

                <div className="dt-card">
                  <h4>Packages</h4>
                  {Array.isArray(dispatch.package) && dispatch.package.map((pkg, i) => (
                    <p key={i}><strong>Package {i + 1}:</strong> {pkg.description} ({pkg.weight}kg) - ₦{parseFloat(pkg.cost || 0).toLocaleString()}</p>
                  ))}
                </div>

                <div className="dt-card">
                  <h4>Total Cost</h4>
                  <p><strong>₦{parseFloat(dispatch.total_cost || 0).toLocaleString()}</strong></p>
                </div>

                <div className="dt-card">
                  <h4>Order Info</h4>
                  <p><strong>Created At:</strong> {dispatch.created_at ? new Date(dispatch.created_at).toLocaleString() : 'N/A'}</p>
                  <p><strong>Payment Status:</strong> {dispatch.payment_status ? '✅ Paid' : '❌ Unpaid'}</p>
                </div>
              </>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default DispatchTracker;
