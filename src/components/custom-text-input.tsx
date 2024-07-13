//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const CustomTextInput = ({ label, ...textInputProps }) => {
  return (
    <View>
      <Text className="mb-2 text-gray-500 font-semibold">{label}</Text>
      <TextInput
        {...textInputProps}
        className="border border-gray-300 p-3 rounded-md"
      />
    </View>
  );
};

export default CustomTextInput;
