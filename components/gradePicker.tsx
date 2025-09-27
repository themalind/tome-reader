import { AppTheme } from '@/theme';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface GradePickerProps {
    value?: number;
    onChange: (number: number) => void;
    label: string;
}

export const GradePicker: React.FC<GradePickerProps> = ({ value, onChange, label }) => {
    const [showPicker, setShowPicker] = useState(false);
    const theme = useTheme<AppTheme>();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
        },
        input: {
            flexDirection: "row",
            padding: 15,
            alignItems: "center"
        },
        inputTitle: {
            width: 80,
            fontWeight: "500",
            alignSelf: "flex-start",
        },
        gradeButton: {
            borderColor: theme.colors.outline,
            borderWidth: 1,
            flex: 1,
            padding: 10,
        },

        picker: {
            flex: 1,
            color: theme.colors.onSurface,
            borderColor: theme.colors.outline,
            borderWidth: 1,
        },
    });

    return (
        <View style={styles.input}>
            <Text style={styles.inputTitle}>{label}</Text>
            {showPicker ? (
                <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                        onChange(itemValue);
                        setShowPicker(false);
                    }}
                    dropdownIconColor={theme.colors.onSurface}
                    style={styles.picker}
                >
                    <Picker.Item label='None' value={undefined} />
                    <Picker.Item label='1' value={1} />
                    <Picker.Item label='2' value={2} />
                    <Picker.Item label='3' value={3} />
                    <Picker.Item label='4' value={4} />
                    <Picker.Item label='5' value={5} />
                </Picker>
            ) : (
                <TouchableOpacity
                    style={styles.gradeButton}
                    onPress={() => setShowPicker(true)}
                >
                    <Text>
                        {value ? `${value}` : 'Select grade'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );


};

