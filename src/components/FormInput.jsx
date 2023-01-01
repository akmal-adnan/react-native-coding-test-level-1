import React from 'react';
import {Text, View, TextInput} from 'react-native';

function FormInput({
  containerStyle,
  textInputStyle,
  label,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  multiline,
  value,
  labelStyle,
  editable,
  maxLength,
  charCount,
  scrollEnabled,
  autoFocus,
  returnKeyType,
  onSubmitEditing,
}) {
  return (
    <View style={{...containerStyle}}>
      {/* Label and error message */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...labelStyle}}>{label}</Text>
        <Text style={{color: 'red'}}>{errorMsg}</Text>
        {charCount ? (
          <Text
            style={{
              color: '#8EA0AA',
            }}>
            {`${charCount}/${maxLength}`}
          </Text>
        ) : null}
      </View>

      {/* Text Input */}
      <View style={{...textInputStyle}}>
        {prependComponent}

        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
          }}
          scrollEnabled={scrollEnabled}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor="#8EA0AA"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={text => onChange(text)}
          value={value}
          editable={editable}
          maxLength={maxLength}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />

        {appendComponent}
      </View>
    </View>
  );
}

export default FormInput;
