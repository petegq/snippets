import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCodeScannerComponent = () => {
  const [scannedData, setScannedData] = useState(null);

  const handleQRCodeScanned = (e) => {
    // Handle scanned QR code data here
    setScannedData(e.data);
  };

  return (
    <View>
      {scannedData ? (
        <>
          <Text style={{ fontSize: 18 }}>Scanned Data:</Text>
          <Text style={{ fontSize: 16 }}>{scannedData}</Text>
        </>
      ) : (
        <QRCodeScanner
          onRead={handleQRCodeScanned}
          showMarker
          checkAndroid6Permissions
          cameraStyle={{ height: 400 }}
        />
      )}
      <TouchableOpacity
        onPress={() => setScannedData(null)}
        style={{ backgroundColor: 'lightblue', padding: 10, marginTop: 20 }}
      >
        <Text style={{ fontSize: 16 }}>Scan Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QRCodeScannerComponent;
