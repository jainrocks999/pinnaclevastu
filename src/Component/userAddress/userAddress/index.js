import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper'
import styles from './styles';

const UserAddress = ({data}) => {

    const [checked,setChecked]=useState(data?.id)

  return (
    <View style={styles.section}>
      {console.log('datata',data)
      }
        <Text style={styles.titleText}>Confirm Address</Text>
        <Text style={styles.NameText}>{data?.name}</Text>
        <Text style={styles.smallText}>{data?.address1} {data?.address2}  {data?.city} ({data?.zip})
        </Text>
        <Text style={styles.smallText}>{data?.province} {data?.country}  {data?.phone} 
         
        </Text>
        <View
          style={[styles.checkboxWrapper, checked && styles.checkedBackground]}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(checked)}
            color="#FFF"
            uncheckedColor="#DFE7EF"
          />
        </View>
      </View> 
  )
}

export default UserAddress