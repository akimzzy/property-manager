<template>
  <div class="mt-2 w-full space-y-2">
    <TextArea v-model="commentText" :rows="2" :placeholder="placeholder" />
    <div class="flex justify-end space-x-2 mt-4">
      <Button @click="cancel" variant="secondary" size="sm"> Cancel </Button>
      <Button
        @click="submit"
        variant="primary"
        size="sm"
        :disabled="!commentText.trim()"
      >
        Submit
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";
import TextArea from "./TextArea.vue";

const props = defineProps<{
  placeholder: string;
  initialText?: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}>();

const commentText = ref(props.initialText || "");

const submit = () => {
  if (!commentText.value.trim()) return;
  props.onSubmit(commentText.value);
  commentText.value = "";
};

const cancel = () => {
  props.onCancel();
  commentText.value = "";
};
</script>
