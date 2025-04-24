<template>
  <div class="">
    <!-- Comments List -->
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="border-b border-gray-200 p-6 last:border-b-0"
    >
      <!-- Main Comment -->
      <div class="flex space-x-4">
        <div class="flex-shrink-0">
          <UserAvatar :username="comment.userName" size="md" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-1">
            <p class="text-[13px] font-medium text-gray-900">
              {{ comment.userName }}
            </p>
            <span
              v-if="comment.isLandlord"
              class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
            >
              Manager
            </span>
            <p class="text-xs text-gray-500">
              {{ formatDate(comment.timestamp) }}
            </p>
          </div>
          <p class="text-[14px] text-gray-900 whitespace-pre-wrap">
            {{ comment.text }}
          </p>
          <!-- Reply Button and Input for Comment -->
          <div class="mt-2 flex justify-start">
            <Button
              v-if="!replyingTo[comment.id]"
              @click="toggleReply(comment.id)"
              variant="text"
              size="sm"
            >
              Reply
            </Button>
            <div v-else class="mt-2 w-full space-y-2">
              <UiCommentInput
                :placeholder="'Write a reply...'"
                :initialText="replyText[comment.id]"
                :onSubmit="() => submitReply(comment.id)"
                :onCancel="() => cancelReply(comment.id)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Replies -->
      <div
        v-if="comment.replies && comment.replies.length > 0"
        class="mt-3 ml-14 space-y-4"
      >
        <div
          v-for="reply in visibleReplies(comment)"
          :key="reply.id"
          class="flex space-x-4"
        >
          <div class="flex-shrink-0">
            <UserAvatar :username="reply.userName" size="sm" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-1">
              <p class="text-[13px] font-medium text-gray-900">
                {{ reply.userName }}
              </p>
              <span
                v-if="reply.isLandlord"
                class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
              >
                Manager
              </span>
              <p class="text-xs text-gray-500">
                {{ formatDate(reply.timestamp) }}
              </p>
              <div v-if="reply.parentReplyId" class="mb-1">
                <span
                  class="text-xs text-blue-600 px-2 py-0.5 rounded flex gap-1 items-center justify-center"
                >
                  <svg
                    class="size-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 20 1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81A9 9 0 0 0 13 15h-2v5Z"
                    ></path>
                  </svg>
                  {{
                    getParentReplyUserName(comment.replies, reply.parentReplyId)
                  }}
                </span>
              </div>
            </div>
            <p class="text-[14px] text-gray-900 whitespace-pre-wrap">
              {{ reply.text }}
            </p>
            <div class="mt-2 flex justify-start">
              <Button
                v-if="!replyingTo[reply.id]"
                @click="toggleReply(reply.id)"
                variant="text"
                size="sm"
              >
                Reply
              </Button>
              <div v-else class="mt-2 w-full space-y-2">
                <UiCommentInput
                  :placeholder="'Write a reply...'"
                  :initialText="replyText[reply.id]"
                  :onSubmit="() => submitReply(reply.id)"
                  :onCancel="() => cancelReply(reply.id)"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="comment.replies.length > 2">
          <Button
            variant="text"
            size="sm"
            class="ml-2 mt-1 text-blue-600"
            @click="toggleShowAllReplies(comment.id)"
          >
            {{
              showAllReplies[comment.id] ? "Hide replies" : "Show more replies"
            }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Comment } from "../data/mockComments";
import { ref, computed, type ComputedRef } from "vue";
import Button from "./ui/Button.vue";
import TextArea from "./ui/TextArea.vue";
import UserAvatar from "./ui/UserAvatar.vue";

const props = defineProps<{
  comments: Comment[];
}>();

const showAllReplies = ref<Record<string, boolean>>({});

function visibleReplies(comment: Comment): Comment[] {
  if (!comment.replies) return [];
  if (showAllReplies.value[comment.id]) {
    return sortedReplies(comment);
  }
  return sortedReplies(comment).slice(0, 2);
}

function toggleShowAllReplies(commentId: string): void {
  showAllReplies.value[commentId] = !showAllReplies.value[commentId];
}

const emit = defineEmits<{
  (e: "add-reply", commentId: string, replyText: string): void;
}>();

const replyingTo = ref<Record<string, boolean>>({});
const replyText = ref<Record<string, string>>({});

const toggleReply = (commentId: string): void => {
  replyingTo.value[commentId] = true;
  replyText.value[commentId] = "";
};

const cancelReply = (commentId: string): void => {
  replyingTo.value[commentId] = false;
  replyText.value[commentId] = "";
};

const submitReply = (commentId: string): void => {
  if (!replyText.value[commentId]?.trim()) return;
  emit("add-reply", commentId, replyText.value[commentId]);
  cancelReply(commentId);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "today";
  } else if (diffDays === 1) {
    return "yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months ago`;
  } else {
    return `${Math.floor(diffDays / 365)} years ago`;
  }
};

const sortCommentsDescending = (
  commentsArr: Comment[] = [],
  parentId: string | null = null
): Comment[] => {
  if (!Array.isArray(commentsArr)) return [];
  // Separate direct replies from nested replies
  const directReplies = commentsArr.filter(
    (c) => !c.parentReplyId || c.parentReplyId === parentId
  );
  const nestedReplies = commentsArr.filter(
    (c) => c.parentReplyId && c.parentReplyId !== parentId
  );
  // Sort each group by timestamp descending
  const sortedDirect = directReplies
    .slice()
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .map((comment) => ({
      ...comment,
      replies: comment.replies
        ? sortCommentsDescending(comment.replies, comment.id)
        : [],
    }));
  const sortedNested = nestedReplies
    .slice()
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .map((comment) => ({
      ...comment,
      replies: comment.replies
        ? sortCommentsDescending(comment.replies, comment.id)
        : [],
    }));
  // Direct replies first, then nested
  return [...sortedDirect, ...sortedNested];
};

const sortedComments: ComputedRef<Comment[]> = computed(() =>
  sortCommentsDescending(props.comments)
);

const sortedReplies = (comment: Comment): Comment[] => {
  return sortCommentsDescending(comment.replies || []);
};

function hasNestedReplies(comment: Comment): boolean {
  return (
    Array.isArray(comment.replies) &&
    comment.replies.some((r: Comment) => r.replies && r.replies.length > 0)
  );
}

function toggleNestedReplies(comment: Comment): void {
  // @ts-expect-error: showNestedReplies is not in Comment type
  comment.showNestedReplies = !comment.showNestedReplies;
}

function getParentReplyUserName(
  replies: Comment[],
  parentReplyId: string
): string {
  const parent = replies.find((r) => r.id === parentReplyId);
  return parent ? parent.userName : "reply";
}
</script>
