import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper'
import styles from './styles';

const UserAddress = ({data}) => {

    const [checked,setChecked]=useState(data?.id)

  return (
    <View style={styles.section}>
        <Text style={styles.titleText}>Confirm Address</Text>
        <Text style={styles.NameText}>{data?.name}</Text>
        <Text style={styles.smallText}>{data?.address} {data?.apartment}  {data?.city} ({data?.zip_code})
          {/* Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.- 123456 */}
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