<template>
  <div class="bg-gray-200 py-10">
    <div class="max-w-lg bg-white mx-auto p-5 shadow">
      <ul
        v-if="!status"
        class="list-none p-4 mb-4 bg-red-100 text-red-500 rounded"
      >
        <li>{{ errors }}</li>
      </ul>

      <div class="flex justify-between">
        <a class="flex items-center mb-5 text-purple-500 font-bold" href="/">
          <font-awesome-icon icon="user-secret" />
          <span class="ml-1">Tag Manager</span>
        </a>

        <a class="flex items-center mb-5 text-blue-500" href="/">
          <i class="fas fa-arrow-left"></i>
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
          v-if="!editing"
          class="rounded-r px-8 bg-blue-500 text-white outline-none"
          @click="addTag(tagName)"
        >
          Add
        </button>
        <button
          v-else
          class="rounded-r px-8 bg-purple-500 text-white outline-none"
          @click="updateTag()"
        >
          Update
        </button>
      </div>

      <h4 class="text-lg text-center font-bold mb-6">Tags {{ tags.lenght }}</h4>

      <table class="table-auto">
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
                  <i class="fas fa-pencil"></i>
                  <span>Edit</span>
                </button>
                <button
                  class="flex gap-1 items-center p-2 max-h-8 rounded bg-red-500 text-white"
                  @click="deleteTag(tag.id)"
                >
                  <i class="fas fa-trash"></i>
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

export default {
  name: "HomeView",
  components: {
    // Tags,
  },
  data() {
    return {
      tagId: "",
      tagName: "",
    };
  },
  computed: {
    ...mapGetters(["status", "errors", "tags"]),
  },
  created() {
    this.$store.dispatch("get");
  },
  methods: {
    ...mapActions(["get", "add", "update", "delete"]),
    async addTag(name) {
      this.add(name);

      this.get();
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
