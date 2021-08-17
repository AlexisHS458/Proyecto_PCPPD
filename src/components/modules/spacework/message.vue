<template>
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
          <v-list-item-title class="title">
            <v-row>
              <v-col class="flex-grow-1 flex-shrink-1"> {{ item.title }}</v-col>
              <v-col class="flex-grow-0 flex-shrink-0">
                <div class="grey--text">11:00 a.m</div>
              </v-col>
              <v-col class="flex-grow-0 flex-shrink-1">
                <v-btn icon color="infoLight">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="errorLight">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item-title>
          <v-list-item-subtitle
            v-html="item.subtitle"
            class="subtitle"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
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
        title: "Summer BBQ",
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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus ex ac urna viverra posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla aliquet pulvinar sagittis. Curabitur purus ante, dictum ac metus volutpat, porttitor iaculis sem. Cras iaculis mauris a odio faucibus faucibus. Nam faucibus elit enim, a facilisis ex pulvinar eu. Etiam congue tempus velit, sed iaculis mauris blandit in. Vestibulum eleifend augue quam, et semper nibh molestie semper. Pellentesque pellentesque, risus vitae euismod vulputate, neque tortor interdum mi, porta molestie mauris lorem vel nunc. Donec at justo velit. Nam lobortis urna a dui pharetra posuere at at massa. Sed ipsum neque, pharetra pharetra egestas et, placerat sed sapien. Cras congue ante ante, non tincidunt sapien gravida quis. Maecenas condimentum, leo quis porta pretium, felis lacus cursus orci, ac mattis purus odio a libero. Donec gravida neque felis, a facilisis libero euismod nec. Pellentesque finibus rutrum libero sed pretium. In nisi lectus, sollicitudin eu lectus a, rhoncus porttitor tellus. Duis interdum, nulla feugiat porta convallis, odio dolor ullamcorper orci, quis condimentum dui risus nec metus. Aliquam ut augue malesuada, sagittis justo eget, facilisis odio. Donec sit amet pharetra mi. Maecenas quam sapien, vulputate sit amet lacinia nec, eleifend vel urna. Donec pulvinar condimentum convallis. Suspendisse malesuada libero nec blandit semper. Aenean venenatis ultrices nunc vitae tempus. Donec luctus ornare metus sit amet porta. Integer vehicula felis turpis, at faucibus felis luctus at. Phasellus vehicula leo vel porta imperdiet. Suspendisse potenti. Suspendisse mattis sapien non hendrerit condimentum. Mauris sagittis tincidunt sapien ac venenatis. Donec lacus lorem, vestibulum a lorem commodo, consectetur consequat lacus. In dignissim placerat odio in finibus. Aliquam erat volutpat. Suspendisse non lorem fringilla, hendrerit diam vitae, aliquam purus. Nulla facilisi. Nam pellentesque mollis tempor. Vivamus tincidunt lorem efficitur felis luctus iaculis. Proin quis felis quis dolor maximus congue. Nulla tristique lacus vitae quam volutpat, pretium lacinia nisi elementum. Curabitur tristique lorem ac tincidunt hendrerit. In suscipit suscipit magna, at aliquam dui semper non. Aliquam fermentum velit ut mattis congue. Donec feugiat quis ante ut sodales. Morbi non massa odio. Mauris condimentum, leo nec iaculis scelerisque, risus risus dapibus ex, ut iaculis dolor massa vitae tellus. Aenean quam risus, semper non placerat ac, suscipit vitae quam. Nunc varius vel dui vitae vestibulum. Fusce tincidunt justo eu tincidunt consequat. Aenean fringilla nisi id consequat interdum. Proin erat eros, auctor ac ultrices vel, varius quis nunc. Etiam auctor tempus dolor porta fringilla. Ut quis erat tortor. Integer tortor enim, bibendum vel bibendum et, eleifend et neque. Cras pellentesque lectus vitae congue ultricies. Sed aliquet ex nec purus commodo, at feugiat lorem viverra. Donec volutpat purus eget massa mattis, quis tempus ipsum suscipit. Donec elit tortor, porta quis posuere at, pellentesque quis elit. Etiam urna orci, ultrices sed elit non, blandit malesuada tortor. Sed nisl mauris, sodales vel tellus vel, ullamcorper vestibulum turpis. In eu lectus et enim pellentesque aliquet. Etiam eget maximus mi, convallis porttitor felis. Aliquam sed tellus molestie, fermentum leo eu, efficitur. ",
      },
    ],
  }),
};
</script>

<style scoped>
.hola {
  background-color: #0c2a52;
  color: white;
  max-height: 100vh;
  overflow-x: auto;
}

.holaa {
  z-index: 2;
}

.v-list-item__subtitle {
  color: #e0e0e0;
}

.title {
  color: #a6e6db;
  padding-bottom: 10px;
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

.v-list--three-line .v-list-item .v-list-item__subtitle,
.v-list-item--three-line .v-list-item__subtitle {
  white-space: initial;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: contents;
}
</style>