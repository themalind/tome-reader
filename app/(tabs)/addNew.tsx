import { Book, books } from "@/data/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import { z } from "zod";

const book = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    image: z.string().optional(), // Va ska det vara här?
    ISBN: z.string().optional(),
    review: z.string().optional(),
    grade: z.number().min(1).max(5),
});

function slugify(title: string) {
    let slug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    let uniqueSlug = slug;
    let i = 1;
    while (books.find((b) => b.slug === uniqueSlug)) {
        uniqueSlug = `${slug}-${i++}`;
    }

    return uniqueSlug;
}

type FormFields = z.infer<typeof book>

export default function AddNew() {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormFields>({ resolver: zodResolver(book), });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        const newBook: Book = {
            id: uuid.v4(),
            title: data.title,
            slug: slugify(data.title),
            author: data.author,
            grade: data.grade,
            image: data.image || require("../../assets/images/noImage.png"),
            review: data.review ?? '',
            ISBN: data.ISBN ?? '',
        }

        books.push(newBook);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            router.push('/books');
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}
        >
            <Text style={styles.header}>Add a tome to your collection</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                        <Text style={styles.inputTitle}>Titel: </Text>
                        <TextInput
                            style={styles.inputfield}
                            placeholder='Titel'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                )}
                name="title"
            />
            {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                        <Text style={styles.inputTitle}>Author: </Text>
                        <TextInput
                            style={styles.inputfield}
                            placeholder='Author'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                )}
                name='author'
            />
            {errors.author && <Text style={styles.error}>{errors.author.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                        <Text style={styles.inputTitle}>Image: </Text>
                        <TextInput
                            style={styles.inputfield}
                            placeholder='Image'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                )}
                name='image'
            />
            {errors.image && <Text>{errors.image.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                        <Text style={styles.inputTitle}>ISBN: </Text>
                        <TextInput
                            style={styles.inputfield}
                            placeholder='ISBN'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        /></View>
                )}
                name='ISBN'
            />
            {errors.ISBN && <Text style={styles.error}>{errors.ISBN.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                        <Text style={styles.inputTitle}>Review: </Text>
                        <TextInput
                            style={styles.inputfield}
                            multiline={true}
                            placeholder='Review'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        /></View>
                )}
                name='review'
            />
            {errors.review && <Text style={styles.error}>{errors.review.message}</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                        <Text style={styles.inputTitle}>Grade (1-5): </Text>
                        <TextInput
                            style={styles.inputfield}
                            placeholder='Add your grade here'
                            onBlur={onBlur}
                            keyboardType="numeric"
                            onChangeText={(text) => onChange(text === '' ? undefined : Number(text))}
                            value={value?.toString() || ''}
                        />
                    </View>
                )}
                name='grade'
            />
            {errors.grade && <Text style={styles.error}>{errors.grade.message}</Text>}
            <Button title="submit" disabled={isSubmitting} onPress={handleSubmit(onSubmit)}></Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        color: "#483d18ff",
        fontSize: 20,
        fontFamily: "MedievalSharp"
    },
    input: {
        flexDirection: "row",
        padding: 15,
        alignItems: "center"
    },
    inputTitle: {
        textAlign: "center",
        width: 50,
        fontWeight: "500",
    },
    inputfield: {
        borderColor: "black",
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flex: 1,
    },
    error: {
        color: "red",
        fontWeight: "700",
        marginTop: 2,
    }
});