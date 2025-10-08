// import React, { useEffect, useState } from 'react';
// import { ScrollView, View, StyleSheet, FlatList } from 'react-native';
// import CardWithActions from '../../components/reusable/CardWithActions';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getWalkinHistory } from '../../api/apiFunctions/User_Sales_exe/SalesDetails';



// const WalkinHistory = () => {
//     const[history,setHistory]= useState([])


// useEffect(()=>
//     {
// const getHistory = async () => {
//     try {
//       const id = await AsyncStorage.getItem('userId');
// const res = await getWalkinHistory(id)
//     console.log('historyyyyy',res);
//     setHistory(res.data)
    
//     } catch (e) {
//       console.log('Error reading AsyncStorage:', e);
//     }
//   };
//   getHistory()
// },[])



//   return (
//     <View style={styles.screen}>
//      <FlatList
//   data={history}
//   keyExtractor={(_, index) => index.toString()}
//   contentContainerStyle={{ padding: 10 }}
//   renderItem={({ item }) => {
//     return (
//       <CardWithActions 
//         companyName={item.companyName} 
//         date={item.time}
//         contactPerson={item.firstName}
//         contactPersonmail={item.contactEmail}
//         productInterested={item.productName}
//         address={item.address}
//       />
//     );
//   }}
// />
//     </View>
//   );
// };

// export default WalkinHistory;

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     // backgroundColor: '#121212',
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import CardWithActions from '../../components/reusable/CardWithActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalkinHistory } from '../../api/apiFunctions/User_Sales_exe/SalesDetails';
import Feather from '@react-native-vector-icons/feather';
import { hp, wp } from '../../utils/responsive';
import MeetingMinutesForm from './MeetingMinutesForm';
import SkeletonCard from '../../components/skeleton/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

const WalkinHistory = () => {
  const [history, setHistory] = useState([]);
  const [ payment,setPayment] = useState(false)
  const[loading,setLoading] = useState(false)
  const [click,setClick] = useState('')

  useEffect(() => {
    const getHistory = async () => {
      setLoading(!loading)
      try {

        const id = await AsyncStorage.getItem('userId');
        const res = await getWalkinHistory(id);

        // Group by date
        const groupedData = res.data.reduce((acc, item) => {
          // format date: "2025-09-19T10:20:00" -> "19 Sep 2025"
          const dateObj = new Date(item.time);
          const dateStr = dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          if (!acc[dateStr]) acc[dateStr] = [];
          acc[dateStr].push(item);
          return acc;
        }, {});

        // Convert to SectionList format
        const sections = Object.keys(groupedData).map((date) => ({
          title: date,
          data: groupedData[date],
        }));

        // Sort sections by date (latest first)
        sections.sort(
          (a, b) =>
            new Date(b.data[0].time).getTime() - new Date(a.data[0].time).getTime()
        );

        setHistory(sections);
        setLoading(false)
      } catch (e) {
        setLoading(false)
        console.log('Error reading AsyncStorage:', e);
      }
    };
    getHistory();
  }, []);

  const handleAction = (item) => {
    if(item[0]=='Payment link'){
      setPayment(!payment)
      setClick('Payment')
    }else{
      setPayment(!payment)
      setClick('Proposal')
    }


  }

 if(payment){
    return (
    <SafeAreaView style={{flex:1}}>
    <MeetingMinutesForm action={click} onClose={setPayment}/>
    </SafeAreaView>)
  }

  return (
    <View style={styles.screen}>
{loading ? (
        <View style={{ padding: 12 }}>{
          [...Array(5)].map((_, index) => (
        <View style={{top:hp(7),marginBottom:hp(2)}}>
          <SkeletonCard height={19} key={index} />
          </View>
        ))}
        </View>
      ) : history.length > 0 ? (
        <SectionList
        key={(_, index) => index.toString()}
        sections={history}
        keyExtractor={(_, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (<View style={{flexDirection:'row',alignItems:'center',left:wp(2)}}>
           <Feather name="calendar" size={14} color='#fff' />
          <Text style={styles.dateHeader}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <CardWithActions
            companyName={item.companyName}
            date={item.time}
            contactPerson={item.firstName}
            contactPersonmail={item.contactEmail}
            productInterested={item.productName}
            address={item.address}
            handleClick={(...items)=>handleAction(items)
            }
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      ) : (
        <Text style={{ color: '#94a3b8', textAlign: 'center', marginTop: 20 }}>No History found</Text>
      )}




      {/* {history.length>0?
       
      :
       [...Array(5)].map((_, index) => (
        <View style={{top:hp(7),marginBottom:hp(2)}}>
          <SkeletonCard key={index} />
          </View>
        ))} */}
     
    </View>
  );
};

export default WalkinHistory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    bottom:hp(6)
    // backgroundColor: '#121212', // dark theme
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
    marginLeft: 5,
  },
});

