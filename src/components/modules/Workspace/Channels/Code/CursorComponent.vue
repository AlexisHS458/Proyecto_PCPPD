<template>
  <div>
    <img src="@/assets/image-white.png" />
    <div class="cursorName" :style="{ background: getColor(cursor.userID) }">
      {{ cursor.nombre }}
    </div>
  </div>
</template>

<script lang="ts">
import { CursorCoordinates } from "@/models/cursorCoordinates";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Colors } from "@/utils/colors";
import { StringUtils } from "@/utils/stringsUtils";
@Component
export default class CursorComponent extends Vue {
  @Prop({
    required: true,
  })
  public cursor!: CursorCoordinates;

  getColor(userID: string): string {
    return Colors.toColor(StringUtils.getHashCode(userID));
  }
}
</script>

<style  scoped>
.cursorName {
  margin-left: 16px;
  border-radius: 8px;
  color: black;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 4px 8px;
}
</style>