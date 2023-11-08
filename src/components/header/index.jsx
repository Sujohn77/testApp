import {Link} from '@react-navigation/native';
import React from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from 'twrnc';

const Header = ({name = 'Home', back}) => {
  return (
    <SafeAreaView>
      {/* <LinearGradient
        style={tw`p-4 drop-shadow-xl opacity-100`}
        colors={['#9D57E3', '#0046CD']}>
        {back && <Link to={back.title}>{back.title}</Link>}
        <Text style={tw`text-center text-3xl font-semibold text-white`}>
          {name}
        </Text>
      </LinearGradient> */}
    </SafeAreaView>
  );
};

export default Header;
