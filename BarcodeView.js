import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useCameraDevices, Camera } from 'react-native-vision-camera'
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner'

const BarcodeView = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                height: 350,
                width: 350
            }}>
                <BarcodeScanner />
            </View>
        </View>
    )
}

const BarcodeScanner = () => {

    const devices = useCameraDevices()
    const device = devices.back

    const [hasPermission, setHasPermission] = useState(false);
    const [isScanned, setIsScanned] = useState(false);

    const [frameProcessor, barcodes] = useScanBarcodes([
        BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
    ]);

    const checkCameraPermission = async () => {
        const status = await Camera.getCameraPermissionStatus();
        setHasPermission(status === 'authorized');
     };

    useEffect(() => {
        console.log('barcodes', barcodes)
    }, [barcodes])

     useEffect(() => {
        checkCameraPermission()
     }, [])

    return (device == null && !hasPermission) ? (
        <View>
            <Text>No Cam</Text>
        </View>
    ) : (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            audio={false}
        />)
}

export default BarcodeView