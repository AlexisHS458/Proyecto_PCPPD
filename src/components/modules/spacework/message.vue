<template>
  <!--  <v-list class="hola">
    <v-list-item v-for="item in items" :key="item.title" link two-line>
      <v-list-item-content>
        <v-list-item-title class="text--white">{{
          item.name
        }}</v-list-item-title>
        <v-list-item-subtitle color="text--white">{{
          item.message
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list> -->
  <v-list three-line class="hola body">
    <template v-for="(item, index) in items">
      <v-subheader
        v-if="item.header"
        :key="item.header"
        v-text="item.header"
      ></v-subheader>

      <v-divider
        v-else-if="item.divider"
        :key="index"
        :inset="item.inset"
      ></v-divider>

      <v-list-item v-else :key="item.title">
        <v-list-item-content>
          <v-list-item-title v-html="item.title" class="title">
          </v-list-item-title>
          <v-list-item-subtitle
            v-html="item.subtitle"
            class="subtitle"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <!--  <v-row align="center" class="mx-0">
            <div class="grey--text ms-4 mr-6">11:00 a.m</div>
            <v-btn icon color="infoLight">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="errorLight">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row> -->
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
/* export default {
  data() {
    return {
      items: [
        {
          name: "Alexis Herrera Saucedo",
          message:
            "Dolore laborum laborum ullamco deserunt cupidatat tempor deserunt aliqua veniam anim sunt.Dolore laborum laborum ullamco deserunt cupidatat tempor deserunt aliqua veniam anim sunt.Dolore laborum laborum ullamco deserunt cupidatat tempor deserunt aliqua veniam anim sunt.",
        },
        { name: "Zamudio", message: "mdi-account-box" },
        { name: "Ramiro", message: "mdi-gavel" },
        {
          name: "Alexis Herrera Saucedo",
          message:
            "Dolore laborum laborum ullamco deserunt cupidatat tempor deserunt aliqua veniam anim sunt.",
        },
        { name: "Zamudio", message: "mdi-account-box" },
        { name: "Ramiro", message: "mdi-gavel" },
        {
          name: "Alexis Herrera Saucedo",
          message:
            "Dolore laborum laborum ullamco deserunt cupidatat tempor deserunt aliqua veniam anim sunt.",
        },
        { name: "Zamudio", message: "mdi-account-box" },
        { name: "Ramiro", message: "mdi-gavel" },
        {
          name: "Alexis Herrera Saucedo",
          message:
            "Dolore laborum laborum ullamco deserunt cupidatat tempor deserunt aliqua veniam anim sunt.",
        },
        { name: "Zamudio", message: "mdi-account-box" },
        { name: "Ramiro", message: "mdi-gavel" },
      ],
    };
  }, */
export default {
  data: () => ({
    items: [
      { header: "Today" },
      {
        title: "Brunch this weekend?",
        subtitle:
          "ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },

      {
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: "Wish I could come, but I'm out of town this weekend.",
      },

      {
        title: "Oui oui",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
      },

      {
        title: "Birthday gift",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?",
      },

      {
        title: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
      {
        title: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
      {
        title: "Brunch this weekend?",
        subtitle:
          "ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
      {
        title: "Brunch this weekend?",
        subtitle:
          "ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
    ],
  }),
};
</script>

<style scoped>
.hola {
  background-color: #3e527e;
  color: white;
  max-height: 100vh;
  overflow-x: auto;
}

.v-list-item__subtitle {
  color: #e0e0e0;
}

.title {
  color: #a6e6db;
}

.theme--light.v-list-item .v-list-item__subtitle,
.theme--light.v-list-item .v-list-item__action-text {
  /* color: rgba(0, 0, 0, 0.6); */
  color: rgb(255, 255, 255);
}

.body::-webkit-scrollbar {
  width: 5px;
}
.body::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.body::-webkit-scrollbar-thumb {
  background-color: #11171a;
  border-radius: 10px;
}
</style>