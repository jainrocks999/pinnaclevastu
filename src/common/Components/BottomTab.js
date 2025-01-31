import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Home from "../../assets/svgIcon/home.svg";
import Category from "../../assets/svgIcon/category.svg";
import Search from "../../assets/svgIcon/Search.svg";
import Bag from "../../assets/svgIcon/Bag.svg";
import Home1 from "../../assets/svgIcon/ic_home.svg";
import Contact from "../../assets/svgIcon/contact.svg";
import Category1 from "../../assets/svgIcon/ic_category.svg";
import { moderateScale } from "../../../src/scalling";
import { colors } from "../../colors";
import { fontSize } from "../../fontSize";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../assets/fonts/fonts";

const BottomTab = ({ home, category, search, bag, onPress, profile, onPress1, onPress2, onPress3, onPress4 }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: "white",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingHorizontal: moderateScale(20),
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                height: 65,
                width: '100%',
                shadowColor: colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 5,
            }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPress}
                    style={{ alignItems: 'center', justifyContent: 'center', width: 60 }}>
                    {home ? <Home1 /> : <Home />}
                    <Text style={{ fontSize: fontSize.Eleven, color: home ? colors.orange : colors.black, fontFamily: fonts.OpenSans_Medium, marginTop: 5 }}>{'Home'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.openDrawer()}
                    style={{ alignItems: 'center', justifyContent: 'center', width: 60 }}>
                    {category ? <Category1 /> : <Category />}
                    <Text style={{ fontSize: fontSize.Eleven, color: category ? colors.orange : colors.black, fontFamily: fonts.OpenSans_Medium, marginTop: 5 }}>{'Categories'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPress2}
                    style={{ alignItems: 'center', justifyContent: 'center', width: 60 }}>
                    {search ? <Search /> : <Search />}
                    <Text style={{ fontSize: fontSize.Eleven, color: search ? colors.orange : colors.black, fontFamily: fonts.OpenSans_Medium, marginTop: 5 }}>{'Search'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPress3}
                    style={{ alignItems: 'center', justifyContent: 'center', width: 60 }}>
                    {bag ? <Bag /> : <Bag />}
                    <Text style={{ fontSize: fontSize.Eleven, color: bag ? colors.orange : colors.black, fontFamily: fonts.OpenSans_Medium, marginTop: 5 }}>{'Bag'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPress4}
                    style={{ alignItems: 'center', justifyContent: 'center', width: 60 }}>
                    {profile ? <Contact /> : <Contact />}
                    <Text style={{ fontSize: fontSize.Eleven, color: profile ? colors.orange : colors.black, fontFamily: fonts.OpenSans_Medium, marginTop: 5 }}>{'Profile'}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default BottomTab;