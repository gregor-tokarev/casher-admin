<template>
  <div class="sidebar">
    <nav v-if="props.navList" class="sidebar__nav nav">
      <ul v-for="(navItem, idx) in props.navList" :key="idx" class="nav__list">
        <nuxt-link :to="navItem.link" class="nav__item-link">
          <li class="nav__item title-large">
            <nuxt-icon :name="navItem.icon"></nuxt-icon>
            {{ navItem.name }}
          </li>
        </nuxt-link>
      </ul>
    </nav>
    <div v-if="props.user" class="user sidebar__user">
      <!--      <img :src="props.user.avatar" :alt="props.user.name + ' ' + props.user.lastname" class="user__img" />-->
      <div class="user__body">
        <p class="user__name title-small">{{ props.user.email }}</p>
        <p class="user__role caption">
          {{ props.user.addedBy ? "Менеджер" : "Админ" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdminUser } from "~/models/admin-user.model";

interface Props {
  navList?: { name: string; icon: string; link: string }[];
  user: AdminUser;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  background-color: var(--surface);
  border-radius: 20px;
  border: 1px solid var(--gray-200);

  &__user {
    margin-top: auto;
  }
}

.nav {
  &__list {
    padding: 0;
    list-style-type: none;
  }

  &__item {
    position: relative;
    padding: 20px 30px;
    transition: all 0.2s;
    cursor: pointer;

    &::after {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      background-color: var(--accent);
      content: "";
      width: 2px;
      height: 40px;
      border-radius: 5px 0 0 5px;
      opacity: 0;
    }

    &:hover {
      background-color: var(--gray-100);
      color: var(--black);
    }
  }

  &__item-link {
    color: var(--gray-400);

    &.router-link-active {
      color: var(--accent);

      .nav__item::after {
        opacity: 1;
      }
    }
  }
}

.user {
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  &__img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
  }

  &__body {
    margin-left: 10px;
  }

  &__name {
    color: var(--gray-400);
  }

  &__role {
    color: var(--gray-300);
  }
}
</style>
