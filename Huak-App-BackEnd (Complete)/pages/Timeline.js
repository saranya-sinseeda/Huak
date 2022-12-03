import { useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Modal, Button } from 'react-native';
import DoubleClick from "react-native-double-click-instagram";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from '../Core/Config'
import { FlatList } from "react-native-gesture-handler";

const Timeline = ({ route }) => {
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [onstart, setonstart] = useState(true);
  const [refresh, onrefresh] = useState(true);

  const tourl = async (refer) => {
    const storage = getStorage();
    let name = 'images/' + refer;
    const listRef = ref(storage, name);
    let url = await getDownloadURL(listRef);
    return url;
  }
  
  // List All Files
  const listItem = async () => {
    const storage = getStorage();
    const listRef = ref(storage, 'images/');
    let temp = [];
    let urll = [];
    setData([]);
    listAll(listRef)
      .then(res => {
        res.items.forEach((item) => {
          temp.push(item.name);
        })
        let n = temp.length;
        temp.forEach(item => {
          tourl(item)
          .then(value=>{
            urll.push(value)
          })
          .then(()=>{
            urll.sort();
            urll.reverse();
          })
          .then(()=>{
            if(urll.length == n){
              urll.forEach(url => {
                let newobj = {'url':url , 'like': false,};
                setData(arr => [...arr, newobj]);
              });
            }
          });
        })

      }
      )
      .catch(err => {
        alert(err.message);
      })
      
  }

  const showModal = () => {
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 2000);
  };

  if (JSON.stringify(route.params) !== undefined) {
    route.params = undefined;
    listItem();
    showModal();
  }

  const renderPhoto = ({item, index}) => {
    let type = [];
      type.push(
        <View
        key={item.url}>
          <DoubleClick
            icon
            delay={300}
            timeout={1000}
            doubleClick={() => {
              data[index].like = true;
              setData(data);
              onrefresh(!refresh);
            }}
          >
            <View>
              <Image style={styles.timeline}
                source={{uri: item.url}} />
            </View>
          </DoubleClick>
          <TouchableOpacity
          style={styles.bottomFrog}
          onPress = {()=>{
            data[index].like = true;
            setData(data)
            onrefresh(!refresh);
          }}
          >
          <Image style={styles.bottomFrog}
            source={item.like ? require('../img/frogIc2.png') : require('../img/frogIc1.png')} />
          </TouchableOpacity>
        </View>
      );
    return type
  }

  if(onstart){
    setonstart(false);
    listItem();
  }

 return (
    <View style={styles.container} >
      <Modal visible={modalOpen} transparent={true}>
        <View style={{
          flex: 1, alignItems: 'center',
          justifyContent: 'center', backgroundColor: '#FFFACDaa', marginHorizontal: '20%', marginVertical: '85%', borderRadius: 20
        }}>
          <View>
            <Image source={require('../img/frogPop.png')}
              style={{ height: 40, width: 40, left: 5 }}
            />
            <Text>Success!</Text>
          </View>
        </View>
      </Modal>

        <FlatList
        data={data}
        renderItem={renderPhoto}
        keyExtractor={item => item.url}
        extraData={refresh}
        />

      <TouchableOpacity style={styles.viewTask}
        onPress={() => navigation.navigate('Prepost', {})} >
        <Image source={require('../assets/frog2.jpg')}
          style={
            {
              height: 44,
              width: 44
            }
          } />
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTask: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 60,
    width: 60,
    backgroundColor: '#003300',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  timeline: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
    height: 350,
    marginTop: 12,
    borderRadius: 20
  },
  bottomFrog: {
    marginTop: 12,
    width: 35,
    height: 35,
    bottom: 10,
    left: 10,

  }
});

export default Timeline