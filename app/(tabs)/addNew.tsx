import { CameraInput } from "@/components/cameraInput";
import { DateInput } from "@/components/dateInput";
import { GradePicker } from "@/components/gradePicker";
import { Book, mockbooks } from "@/data/books";
import { saveBookImage } from "@/data/storage";
import { useBook } from "@/providers/bookContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import uuid from "react-native-uuid";
import { z } from "zod";

const book = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  imagePath: z.string().optional(),
  ISBN: z.string().optional(),
  review: z.string().optional(),
  grade: z.number().min(1).max(5).optional(),
  readDate: z.date(),
});

type FormFields = z.infer<typeof book>;

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
  while (mockbooks.find((b) => b.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${i++}`;
  }

  return uniqueSlug;
}

export default function AddNew() {
  const { addNewBook } = useBook();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    resolver: zodResolver(book),
    defaultValues: {
      title: "",
      author: "",
      readDate: new Date(),
      grade: undefined,
      imagePath: "",
      ISBN: "",
      review: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      let newBook: Book = {
        id: uuid.v4(),
        title: data.title,
        slug: slugify(data.title),
        author: data.author,
        grade: data.grade,
        readDate: data.readDate,
        dateAdded: new Date(),
        imagePath: "",
        review: data.review ?? "",
        ISBN: data.ISBN ?? "",
      };

      newBook.imagePath = data.imagePath
        ? await saveBookImage(data.imagePath, newBook.id)
        : "";

      addNewBook(newBook);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      router.push("/books");
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
    >
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.input}>
            <Text style={styles.inputTitle}>Titel: </Text>
            <TextInput
              style={styles.inputfield}
              placeholder="Title"
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
              placeholder="Author"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name="author"
      />
      {errors.author && (
        <Text style={styles.error}>{errors.author.message}</Text>
      )}
      <Controller
        control={control}
        name="readDate"
        render={({ field: { onChange, value } }) => (
          <DateInput
            value={value || new Date()}
            onChange={onChange}
            label="Date read:"
          />
        )}
      />
      {errors.readDate && (
        <Text style={styles.error}>{errors.readDate.message}</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.input}>
            <Text style={styles.inputTitle}>ISBN: </Text>
            <TextInput
              style={styles.inputfield}
              placeholder="ISBN"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name="ISBN"
      />
      {errors.ISBN && <Text style={styles.error}>{errors.ISBN.message}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.input}>
            <Text style={styles.inputTitle}>Review: </Text>
            <TextInput
              style={[styles.inputfield, { minHeight: 100, maxHeight: 300 }]}
              multiline={true}
              placeholder="Review"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name="review"
      />
      {errors.review && (
        <Text style={styles.error}>{errors.review.message}</Text>
      )}
      <Controller
        control={control}
        name="grade"
        render={({ field: { onChange, value } }) => (
          <GradePicker
            value={value || undefined}
            onChange={onChange}
            label="Add grade:"
          />
        )}
      />
      {errors.grade && <Text style={styles.error}>{errors.grade.message}</Text>}
      <Controller
        control={control}
        name="imagePath"
        render={({ field: { onChange, value } }) => (
          <CameraInput value={value ?? ""} onChange={onChange} label="Image:" />
        )}
      />
      {errors.imagePath && <Text>{errors.imagePath.message}</Text>}
      <Button
        mode="contained"
        disabled={isSubmitting}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        {" "}
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    margin: 5,
  },
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
  inputfield: {
    flex: 1,
    height: 40,
  },

  error: {
    color: "red",
    fontWeight: "700",
    marginTop: 2,
  },
});
