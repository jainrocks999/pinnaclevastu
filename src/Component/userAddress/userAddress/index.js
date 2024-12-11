import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper'
import styles from './styles';

const UserAddress = () => {

    const [checked,setChecked]=useState(false)

  return (
    <View style={styles.section}>
        <Text style={styles.titleText}>Confirm Address</Text>
        <Text style={styles.NameText}>Tejash Shah</Text>
        <Text style={styles.smallText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.- 123456
        </Text>

        <View
          style={[styles.checkboxWrapper, checked && styles.checkedBackground]}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color="#FFF"
            uncheckedColor="#DFE7EF"
          />
        </View>
      </View> 
  )
}

export default UserAddress