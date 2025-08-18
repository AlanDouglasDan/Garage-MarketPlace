import React, { FC, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackNavParams } from "navigation/AppStackNav";
import { supabase } from "core/supabase";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { layout, spacing, palette } from "core/styles";
import { Logo } from "components/Logo";
import styles from "./Login.styles";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: FC<NativeStackScreenProps<AppStackNavParams, "Login">> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: FormValues) => {
    const { email, password } = values;

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("User signed in successfully!", data);

    if (error) Alert.alert(error.message);

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
                      label="Email Address"
                      placeholder="Enter your email address"
                      value={values.email}
                      onChangeText={(text: string) =>
                        setFieldValue("email", text)
                      }
                      onBlur={() => setFieldTouched("email")}
                      error={touched.email ? errors.email : undefined}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />

                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChangeText={(text: string) =>
                        setFieldValue("password", text)
                      }
                      containerStyle={spacing.marginTop24}
                      onBlur={() => setFieldTouched("password")}
                      error={touched.password ? errors.password : undefined}
                      type="password"
                    />
                  </View>

                  <Button
                    title="Sign In"
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
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
