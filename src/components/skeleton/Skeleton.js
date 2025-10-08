// import React from 'react';
// import { View, FlatList } from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// const SkeletonCard = () => {
//   return (
//     <View style={{ marginBottom: 15, borderRadius: 12, overflow: 'hidden' }}>
//       <SkeletonPlaceholder borderRadius={8} backgroundColor="#2e2e2e" highlightColor="#3d3d3d">
//         <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
//           {/* User Icon */}
//           <View style={{ width: wp('8%'), height: wp('8%'), borderRadius: wp('4%') }} />

//           {/* Name & Phone */}
//           <View style={{ marginLeft: 12 }}>
//             <View style={{ width: wp('30%'), height: 12, marginBottom: 6 }} />
//             <View style={{ width: wp('20%'), height: 10 }} />
//           </View>
//         </View>

//         {/* Call count */}
//         <View style={{ width: wp('15%'), height: 10, marginLeft: 15, marginBottom: 10 }} />

//         {/* Action buttons */}
//         <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
//           <View style={{ width: wp('10%'), height: wp('10%'), borderRadius: 8 }} />
//           <View style={{ width: wp('10%'), height: wp('10%'), borderRadius: 8 }} />
//           <View style={{ width: wp('10%'), height: wp('10%'), borderRadius: 8 }} />
//           <View style={{ width: wp('10%'), height: wp('10%'), borderRadius: 8 }} />
//         </View>
//       </SkeletonPlaceholder>
//     </View>
//   );
// };

// const SkeletonList = () => {
//   return (
//     <FlatList
//       data={Array(10).fill(0)}
//       keyExtractor={(_, i) => i.toString()}
//       renderItem={() => <SkeletonCard />}
//       contentContainerStyle={{ padding: 10 }}
//     />
//   );
// };

// export default SkeletonList;

import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { hp, wp } from "../../utils/responsive";

const { width } = Dimensions.get("window");

const ShimmerPlaceholder = ({ style }) => {
  const shimmer = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Interpolate shimmer position
  const translateX = shimmer.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={[styles.skeleton, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.shimmer} />
      </Animated.View>
    </View>
  );
};

const SkeletonCard = ({height}) => (
  <View style={[styles.card,{height:hp(height)}]}>
    {/* Avatar */}
    {/* <ShimmerPlaceholder style={styles.avatar} /> */}

    {/* <View style={{}}> */}
      <ShimmerPlaceholder style={styles.lineShort} />
      <ShimmerPlaceholder style={styles.lineLong} />
    {/* </View> */}
    <View style={{flexDirection:'row',top:hp(6),justifyContent:'space-evenly'}}>
        <ShimmerPlaceholder style={styles.icon} />
        <ShimmerPlaceholder style={styles.icon} />
        <ShimmerPlaceholder style={styles.icon} />
        <ShimmerPlaceholder style={styles.icon} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#0d172a", // dark base
    overflow: "hidden",
  },
  shimmer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)", // highlight shimmer
  },
  card: {
    // flexDirection: "row",
    // alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
     width: wp('90%'),
     alignSelf:'center',
    //  height:hp(height)
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  lineShort: {
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
    width: "60%",
  },
  lineLong: {
    height: 10,
    borderRadius: 6,
    width: "40%",
  },
  icon:{
    height:hp(3),
    width:wp(5)
  }
});

export default SkeletonCard;

