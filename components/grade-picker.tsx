import { AppTheme } from "@/theme";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface GradePickerProps {
  value?: number;
  onChange: (number: number) => void;
  label: string;
}

export const GradePicker: React.FC<GradePickerProps> = ({
  value,
  onChange,
  label,
}) => {
  const theme = useTheme<AppTheme>();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    input: {
      flexDirection: "row",
      padding: 15,
      alignItems: "center",
    },
    inputTitle: {
      width: 80,
      fontWeight: "500",
      alignSelf: "baseline",
    },
    gradeButton: {
      borderColor: theme.colors.outline,
      borderWidth: 1,
      flex: 1,
      padding: 10,
    },
    pickerContainer: {
      flex: 1,
      borderBottomColor: theme.colors.outline,
      borderBottomWidth: 1,
      backgroundColor: theme.colors.surfaceVariant,
      borderTopEndRadius: 4,
      borderTopLeftRadius: 4,
    },
    picker: {
      color: theme.colors.onSurface,
    },
  });

  return (
    <View style={styles.input}>
      <Text style={styles.inputTitle}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => {
            onChange(itemValue);
          }}
          style={styles.picker}
          dropdownIconColor={theme.colors.onSurface}
        >
          <Picker.Item label="None" value={undefined} />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
        </Picker>
      </View>
    </View>
  );
};
