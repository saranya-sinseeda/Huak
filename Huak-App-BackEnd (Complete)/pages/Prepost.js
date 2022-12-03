import { useNavigation } from '@react-navigation/native';
import {React, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Button, Modal} from "react-native";
import uploadImageFromDevice from "../uploadImageFromDevice";
import getBlobFromUri from "../getBlobFromUri";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// const ModalPoup = ({visible, children}) => {
//     const [showModel, setShowModel] = React.useState(visible);
//     return (
//     <Modal transparent visible={true}>
//         <View style={styles.container}>
//             <view style={[styles.modalContainer]}> {children}
//             </view>
//         </View>
//     </Modal>
//     )
// };

const Prepost = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);

    const manageFileUpload = async (file) => {
        const imgName = "img-" +  new Date().getTime();
        const storage = getStorage();
        const storageRef = ref(storage, `images/${imgName}.jpg`);
    
        const metadata = {
            contentType: "image/jpeg",
          };
      
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      
      // Listen for state changes, errors, and completion of the upload.
      // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        setVisible(false);
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImage(null);
          navigation.navigate('Timeline', {post:true});
        });
      }
    );
    };

    const upimage = async () => {
        if (!image) return;
        setVisible(true);
        const file = await getBlobFromUri(image);
        await manageFileUpload(file);
      }

    const pickimg = async () => {
        const blob = await uploadImageFromDevice();
        if (blob) {
          setImage(blob);
        }
      }

    return(
        <View style={ styles.container }>
          <Modal visible={visible} transparent={true}>
        <View style={{
          flex: 1, alignItems: 'center',
          justifyContent: 'center', backgroundColor: '#FFFACDaa', marginHorizontal: '20%', marginVertical: '85%', borderRadius: 20
        }}>
          <View>
            <Image source={require('../img/frogPop.png')}
              style={{ height: 40, width: 40, left: 5 }}
            />
            <Text>Uploading!!</Text>
          </View>
        </View>
      </Modal>
            <ScrollView>
                <TouchableOpacity
                onPress={() => {
                    pickimg();
                }}
                >
                <Image style = { styles.post } 
                source = {image ? { uri: image } : require('../img/frog.jpg') }/>
                </TouchableOpacity>
                
                <TouchableOpacity style = { styles.cancle } //ตรงนี้เอาไว้ลบรูป เวลาต้องการเปลี่ยนรูป เดี๋ยวเราจะใส่ให้มันกลับไปที่หน้าgallery
                onPress = {() => 
                    setImage(null)
                 }>
                <Text style = {styles.buttonCancle}>X</Text>
                </TouchableOpacity>  
            </ScrollView>

            

            <TouchableOpacity style = { styles.viewTask } //ตรงนี้เราใส่ให้เวลาโพสต์กลับไปหน้าtimelineก่อนนะ
                onPress = {() => upimage() }> 
                <Text style = {styles.buttonPost}>POST</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewTask: {
        position: 'absolute',
        right: 16,
        height: 40,
        width: 90,
        bottom: 100,
        backgroundColor: '#1b8057',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 5
        }
    },
    buttonPost:{
        color: '#ede9a3',
        fontWeight: 'bold',
        fontSize: 17
    },
    post: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 360,
        height: 350,
        marginTop: 12,
        borderRadius: 20
    },
    buttonCancle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#534340'
    },
    cancle: {
        backgroundColor: '#D7C37A',
        position: 'absolute',
        right: 9,
        height: 40,
        width: 40,
        top: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 5
        },
    },

    modalContainer: {
        width: '80%',
        backgroundColor: 'orange',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },

    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#534340'
    }
});

export default Prepost