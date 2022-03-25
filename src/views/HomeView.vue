<template>
  <div style="height: 100vh" class="bg-gray-200 py-10">
    <div class="max-w-lg bg-white mx-auto p-5 shadow">
      <div
        v-if="!status"
        class="list-none p-4 mb-4 bg-red-100 text-red-500 rounded"
        v-html="errors"
      />

      <div class="flex justify-between">
        <a class="flex items-center mb-5 text-purple-500 font-bold" href="/">
          <tag-icon />
          <span class="ml-1">Tag Manager Vue</span>
        </a>

        <a
          v-show="editing"
          class="flex items-center mb-5 text-blue-500"
          href="/"
        >
          <arrow-left-icon />
          <span class="ml-1">Volver</span>
        </a>
      </div>

      <div class="flex mb-4">
        <input
          v-model="tagName"
          type="text"
          name="name"
          class="rounded-l bg-gray-200 p-4 w-full outline-none"
          placeholder="Tag 1"
        />
        <button
          class="rounded-r px-8 bg-blue-500 text-white outline-none"
          v-if="!editing"
          :disabled="loading"
          @click="addTag(tagName)"
        >
          <is-loading v-show="loading" />
          <span v-show="!loading">Add</span>
        </button>
        <button
          class="rounded-r px-8 bg-blue-500 text-white outline-none"
          v-else
          :disabled="loading"
          @click="updateTag()"
        >
          <is-loading v-show="loading" />
          <span v-show="!loading">Update</span>
        </button>
      </div>

      <h4 class="text-lg text-center font-bold mb-6">Tags {{ tags.lenght }}</h4>

      <div class="flex justify-center">
        <is-loading v-show="loading" />
      </div>

      <table v-show="!loading" class="table-auto">
        <thead>
          <tr>
            <th width="35%">Tag</th>
            <th width="35%">Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag in tags" :key="tag.id">
            <td width="35%" class="border px-4 py-2">{{ tag.name }}</td>
            <td width="35%" class="border px-4 py-2">{{ tag.slug }}</td>
            <td class="px-4 py-2">
              <div class="flex gap-1">
                <button
                  class="flex gap-1 items-center p-2 max-h-8 rounded bg-blue-500 text-white"
                  @click="editTag(tag.id, tag.name)"
                >
                  <pencil-icon style="height: 1rem; width: 1rem" />
                  <span>Edit</span>
                </button>
                <button
                  class="flex gap-1 items-center p-2 max-h-8 rounded bg-red-500 text-white"
                  @click="deleteTag(tag.id)"
                >
                  <trash-icon style="height: 1rem; width: 1rem" />
                  <span>Remove</span>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="tags.lenght === 0">
            <td>There are no tags.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import IsLoading from "@/components/IsLoading.vue";
import TagIcon from "@/components/Icons/TagIcon.vue";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon.vue";
import PencilIcon from "@/components/Icons/PencilIcon.vue";
import TrashIcon from "@/components/Icons/TrashIcon.vue";

export default {
  name: "HomeView",
  components: {
    IsLoading,
    TagIcon,
    ArrowLeftIcon,
    PencilIcon,
    TrashIcon,
  },
  data() {
    return {
      tagId: "",
      tagName: "",
    };
  },
  computed: {
    ...mapGetters(["loading", "status", "errors", "tags"]),
  },
  created() {
    this.$store.dispatch("get");
  },
  methods: {
    ...mapActions(["get", "add", "update", "delete"]),
    async addTag(name) {
      this.add(name);

      this.get();

      this.editing = false;
      this.tagName = "";
    },
    editTag(id, name) {
      this.editing = true;

      this.tagId = id;
      this.tagName = name;
    },
    updateTag() {
      const tag = {
        id: this.tagId,
        newName: this.tagName,
      };

      this.update(tag);

      this.editing = false;
      this.tagName = "";

      this.get();
    },
    async deleteTag(id) {
      this.delete(id);

      this.get();
    },
  },
};
</script>
