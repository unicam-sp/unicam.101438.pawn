import AsyncStorage from '@react-native-async-storage/async-storage'

export function LOG(str) {
	console.log(str)
	AsyncStorage.getItem('logs')
	.then((string) => {
		AsyncStorage.setItem('logs', string + '\n' + str)
	})
}