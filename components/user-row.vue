<script setup lang="ts">
import User from '@/server/utils/database/models/user'

interface Props {
    user: User
}

interface Emits {
    (e: 'delete', id: string)
}

const { user } = defineProps<Props>()
const emits = defineEmits<Emits>()

function onDelete() {
    emits('delete', user.id)
}

</script>

<template>
    <tr class="user" ref="container">
        <td><ProfileImage :user="user" size="64"/></td>
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td class="role">{{ user.role }}</td>
        <td>
            <button class="kill" @click="onDelete">
                <IconWand/>
                <IconWandSparkles/>
            </button>
        </td>
    </tr>
</template>

<style lang="scss" scoped>

tr {
    border-bottom: 1px solid var(--bg-tertiary);

    td {
        padding: 12px;
        font-size: 17px;

        .profile-image {
            padding: 8px;
        }

        &.role {
            text-transform: capitalize;
            color: var(--text-secondary);
        }

        .icon {
            width: 20px;
            height: 20px;
        }

        button.kill {
            .icon.wand {
                color: var(--text-secondary);
            }
            .icon.wand-sparkles {
                display: none;
                color: green;
            }

            &:hover {
                .icon.wand {
                    display: none;
                }
                .icon.wand-sparkles {
                    display: block;
                }
            }
        }
    }    
}

</style>