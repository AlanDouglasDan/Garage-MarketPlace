import React, { FC, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { useUser } from "store/user/hooks";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { layout, spacing } from "core/styles";
import styles from "./Profile.styles";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
}

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
};

const validationSchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
});

const Profile: FC<
  NativeStackScreenProps<BottomTabsNavParams, "Profile">
> = () => {
  const { currentUser, updateUser, loading } = useUser();

  const onSubmit = async (values: FormValues) => {
    const { fullName, email, phone } = values;

    const res = await updateUser({
      full_name: fullName,
      email,
      phone,
      id: currentUser?.id,
    });

    if (res && !res.error) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
          behavior="padding"
          style={layout.flex1}
        >
          <Text style={styles.bigText}>Profile</Text>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              touched,
              errors,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
            }) => {
              useEffect(() => {
                if (currentUser) {
                  setFieldValue("fullName", currentUser.full_name);
                  setFieldValue("email", currentUser.email);
                  setFieldValue("phone", currentUser.phone);
                }
              }, [currentUser]);

              return (
                <>
                  <View style={layout.flex1}>
                    <Input
                      label="Enter your full name"
                      placeholder="Full Name"
                      value={values.fullName}
                      onChangeText={(text) => setFieldValue("fullName", text)}
                      containerStyle={spacing.marginTop16}
                      error={
                        touched.fullName && errors.fullName
                          ? errors.fullName
                          : undefined
                      }
                      onBlur={() => setFieldTouched("fullName")}
                      keyboardType="default"
                    />

                    <Input
                      label="Enter your email"
                      placeholder="Email"
                      value={values.email}
                      onChangeText={(text) => setFieldValue("email", text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.email && errors.email ? errors.email : undefined
                      }
                      onBlur={() => setFieldTouched("email")}
                      keyboardType="email-address"
                    />

                    <Input
                      label="Enter your phone number"
                      placeholder="Phone Number"
                      value={values.phone}
                      onChangeText={(text) => setFieldValue("phone", text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.phone && errors.phone ? errors.phone : undefined
                      }
                      onBlur={() => setFieldTouched("phone")}
                      keyboardType="phone-pad"
                    />
                  </View>

                  <Button
                    title="Update Profile"
                    onPress={() => handleSubmit()}
                    disabled={!currentUser || loading}
                    loading={loading}
                  />
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
