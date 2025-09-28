import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface DateInputProps {
    value: Date;
    onChange: (date: Date) => void;
    label: string;
}

export const DateInput: React.FC<DateInputProps> = ({ value, onChange, label }) => {
    const [showPicker, setShowPicker] = useState(false);
    const theme = useTheme();

    const styles = StyleSheet.create({
        input: {
            flexDirection: "row",
            padding: 15,
            alignItems: "center",
        },
        inputTitle: {
            width: 80,
            fontWeight: "500",
            alignSelf: "flex-start",
        },
        dateButton: {
            borderBottomColor: theme.colors.outline,
            borderWidth: 1,
            borderTopColor: theme.colors.surfaceVariant,
            borderLeftColor: theme.colors.surfaceVariant,
            borderRightColor: theme.colors.surfaceVariant,
            flex: 1,
            padding: 10,
            borderRadius: 4,
            backgroundColor: theme.colors.surfaceVariant,
        },
    });

    return (
        <View style={styles.input}>
            <Text style={styles.inputTitle}>{label}</Text>
            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowPicker(true)}
            >
                <Text>
                    {value ? value.toLocaleDateString() : 'Select date'}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowPicker(false);
                        if (selectedDate) onChange(selectedDate);
                    }}
                />
            )}
        </View>
    );
};

