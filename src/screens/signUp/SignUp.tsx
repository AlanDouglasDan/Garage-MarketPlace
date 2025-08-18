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
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackNavParams } from "navigation/AppStackNav";
import { supabase } from "core/supabase";
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
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: FormValues) => {
    const { fullName, email, phone, password } = values;

    setLoading(true);

    // Sign up a user (with email/password) and create a profile
    const { data: user, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log("User created successfully!", user);

    if (authError) {
      console.error("Error signing up:", authError.message);
      return;
    }

    // After the user signs up, insert their profile into 'profiles' table
    const { data, error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user?.user?.id, // This ties the profile to the user
          full_name: fullName,
          phone,
          avatar_url: "", // Default value, can be updated later
          is_host: false, // Optional, set the default role
        },
      ]);

    if (profileError) {
      console.error("Error inserting profile:", profileError.message);
    } else {
      console.log("Profile created successfully!", data);
    }

    setLoading(false);
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

          {/* <Text
            style={[
              styles.header20,
              spacing.marginTop48,
              spacing.marginBottom8,
            ]}
          >
            Enter your information
          </Text>

          <Text style={styles.text16}>
            Please enter your real first and last name. This is important for
            identity verification and must match the name on any bank account
            you add to receive payments
          </Text> */}

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
