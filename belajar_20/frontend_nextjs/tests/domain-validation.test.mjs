import assert from "node:assert/strict";
import test from "node:test";
import { validateAuthForm } from "../features/auth/schemas/auth-form.ts";
import { validateContentForm } from "../features/contents/schemas/content-form.ts";
import {
  initialMetricFormValues,
  sortMetricHistoryNewestFirst,
  validateMetricForm,
  validatePublishedUrl,
} from "../features/contents/schemas/content-detail.ts";
import { contentDetailPreview } from "../features/contents/mock/content-detail-preview.ts";
import { isContentStatus } from "../features/contents/types/content.ts";

test("login and register validation enforce their required fields", () => {
  const validLogin = validateAuthForm({
    name: "",
    email: "creator@example.com",
    password: "secure-pass",
    confirmPassword: "",
  }, "login");
  assert.deepEqual(validLogin, {});

  const invalidRegister = validateAuthForm({
    name: "A",
    email: "not-an-email",
    password: "short",
    confirmPassword: "different",
  }, "register");
  assert.deepEqual(Object.keys(invalidRegister).sort(), [
    "confirmPassword",
    "email",
    "name",
    "password",
  ]);
});

test("content form requires title, channel id, and format type", () => {
  assert.deepEqual(validateContentForm({
    title: "  ",
    channel_id: "",
    format_type: "",
    description: "optional",
    script: "optional",
  }), {
    title: "Judul konten wajib diisi.",
    channel_id: "Channel ID wajib diisi.",
    format_type: "Format konten wajib diisi.",
  });

  assert.deepEqual(validateContentForm({
    title: "A valid title",
    channel_id: "channel-1",
    format_type: "video",
    description: "",
    script: "",
  }), {});
});

test("publication URLs only allow absolute HTTP and HTTPS URLs", () => {
  assert.equal(validatePublishedUrl("https://creator.example/video"), true);
  assert.equal(validatePublishedUrl("http://creator.example/video"), true);
  assert.equal(validatePublishedUrl("javascript:alert(1)"), false);
  assert.equal(validatePublishedUrl("ftp://creator.example/video"), false);
  assert.equal(validatePublishedUrl("//creator.example/video"), false);
  assert.equal(validatePublishedUrl("not a URL"), false);
});

test("metrics accept zero and non-negative safe integers only", () => {
  assert.deepEqual(validateMetricForm({
    views: "0",
    likes: "18",
    comments: "2",
    shares: "1",
  }), {});

  const invalidMetrics = validateMetricForm({
    views: "-1",
    likes: "1.5",
    comments: "",
    shares: "9007199254740992",
  });
  assert.deepEqual(Object.keys(invalidMetrics).sort(), ["comments", "likes", "shares", "views"]);
  assert.deepEqual(validateMetricForm(initialMetricFormValues), {
    views: "Views harus berupa bilangan bulat non-negatif.",
    likes: "Likes harus berupa bilangan bulat non-negatif.",
    comments: "Comments harus berupa bilangan bulat non-negatif.",
    shares: "Shares harus berupa bilangan bulat non-negatif.",
  });
});

test("metric history is sorted newest first without mutating its input", () => {
  const snapshots = [
    { id: "old", recordedAt: "2026-10-08T00:00:00.000Z" },
    { id: "new", recordedAt: "2026-10-12T00:00:00.000Z" },
  ];

  assert.deepEqual(sortMetricHistoryNewestFirst(snapshots).map(({ id }) => id), ["new", "old"]);
  assert.deepEqual(snapshots.map(({ id }) => id), ["old", "new"]);
});

test("lifecycle status guard and local preview fixture stay within the contract", () => {
  assert.equal(isContentStatus("published"), true);
  assert.equal(isContentStatus("archived"), false);
  assert.equal(contentDetailPreview.id, "demo-42");
  assert.equal(contentDetailPreview.status, "editing");
});