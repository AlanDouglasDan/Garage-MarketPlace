import React, { FC, useState } from "react";
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
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackNavParams } from "navigation/AppStackNav";
import { useUser } from "store/user/hooks";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { Logo } from "components/Logo";
import { layout, spacing, palette } from "core/styles";
import styles from "./SignUp.styles";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
};

const validationSchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
});

const SignUp: FC<NativeStackScreenProps<AppStackNavParams, "SignUp">> = ({
  navigation,
}) => {
  const { loading, signUp } = useUser();

  const onSubmit = async (values: FormValues) => {
    const { fullName, email, phone, password } = values;

    const res = await signUp({ fullName, email, phone, password });

    if (res && !res.error) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User created successfully",
      });

      navigation.navigate("Bottom Tabs");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: res.error?.message || "Something went wrong",
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
          behavior="padding"
          style={layout.flex1}
        >
          <View style={styles.centerSection}>
            <Logo />
          </View>

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
              isValid,
              dirty,
            }) => {
              return (
                <>
                  <View style={layout.flex1}>
                    <Input
                      label="Enter your full name"
                      placeholder="Full Name"
                      value={values.fullName}
                      onChangeText={(text) => setFieldValue("fullName", text)}
                      containerStyle={spacing.marginTop32}
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

                    <Input
                      label="Enter your password"
                      placeholder="Password"
                      value={values.password}
                      onChangeText={(text) => setFieldValue("password", text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : undefined
                      }
                      onBlur={() => setFieldTouched("password")}
                      keyboardType="default"
                      type="password"
                    />
                  </View>

                  <Button
                    title="Create my account"
                    suffixIcon={
                      <Feather
                        name="arrow-right"
                        size={24}
                        color={isValid && dirty ? palette.WHITE : palette.GREY2}
                      />
                    }
                    onPress={() => handleSubmit()}
                    disabled={!(isValid && dirty) || loading}
                    loading={loading}
                  />

                  <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>
                      Already have an account?{" "}
                    </Text>
                    <Text
                      style={styles.signInLink}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Sign In
                    </Text>
                  </View>
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
