import { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, Image, Text, TouchableOpacity } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function WebViewScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const TARGET_URL = 'https://magnattos.com';

  const LoadingScreen = () => (
    <View style={styles.loadingContainer}>
      <LinearGradient
        colors={['#FF385C', '#FF385C', '#FF5C7C']}
        style={styles.loadingGradient}
      />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80' }}
        style={styles.loadingLogo}
        resizeMode="cover"
      />
      <ActivityIndicator 
        size={Platform.OS === 'ios' ? 'large' : 50} 
        color="#ffffff"
        style={styles.loadingSpinner}
      />
    </View>
  );

  const ErrorScreen = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Connection Error</Text>
      <Text style={styles.errorText}>Unable to load the website. Please check your internet connection and try again.</Text>
      <TouchableOpacity 
        style={styles.retryButton}
        onPress={() => {
          setHasError(false);
          setIsLoading(true);
          webViewRef.current?.reload();
        }}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  const injectedJavaScript = `
    window.onerror = function(message, source, lineno, colno, error) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'error',
        message: message
      }));
      return true;
    };
    true;
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'error') {
        handleError();
      }
    } catch (e) {
      // Handle parse error silently
    }
  };

  const handleShouldStartLoadWithRequest = (request: WebViewNavigation) => {
    return request.url.startsWith('https://');
  };

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        ref={webViewRef}
        source={{ 
          uri: TARGET_URL,
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          }
        }}
        style={styles.webview}
        onLoadStart={() => {
          setIsLoading(true);
          setHasError(false);
        }}
        onLoadEnd={() => setIsLoading(false)}
        onError={handleError}
        onHttpError={handleError}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        renderLoading={LoadingScreen}
        cacheEnabled={false}
        pullToRefreshEnabled={true}
        allowsBackForwardNavigationGestures={true}
        incognito={true}
        mixedContentMode="compatibility"
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
      {isLoading && <LoadingScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF385C',
  },
  loadingGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loadingLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: '#FF385C',
  },
  loadingSpinner: {
    position: 'absolute',
    bottom: '20%',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF385C',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#72777A',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#FF385C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});