import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ComingSoonScreen = () => {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.imageWrapper}>
          {!imageLoaded && <ActivityIndicator size="large" color="#4A9EE3" />}
          <Image
            source={require('../assets/cat.png')}
            style={[styles.image, !imageLoaded && styles.hidden]}
            resizeMode="contain"
            onLoad={() => setImageLoaded(true)}
          />
        </View>
        <Text style={styles.title}>Создание заказа временно недоступно</Text>
        <Text style={styles.subtitle}>но вы можете пока насладиться котиком</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  back: { padding: 16 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  imageWrapper: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  image: { width: 260, height: 260 },
  hidden: { opacity: 0, position: 'absolute' },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: '#999', textAlign: 'center' },
});

export default ComingSoonScreen;
