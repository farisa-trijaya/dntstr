<template>
  <div class="md:flex md:space-y-0 space-y-5" :class="wrapperClass">
    <div
      class="flex items-center space-x-4 rtl:space-x-reverse"
      v-if="enableSearch"
      :class="searchClass"
    >
      <div
        class="flex items-center space-x-2 rtl:space-x-reverse"
        v-if="enableSearch && enableInput"
      >
        <input
          v-model.number="input"
          class="form-control w-9 overflow-auto h-9"
          type="text"
          placeholder="0"
        />
        <div
          @click.prevent="changePage(parseInt(input))"
          class="flex-0 cursor-pointer text-sm h-9 w-9 bg-orange-600 text-gray-50 dark:bg-orange-500 dark:text-gray-50 hover:bg-orange-600 dark:hover:bg-orange-600 flex items-center justify-center rounded"
        >
          Go
        </div>
      </div>

      <div class="flex items-center" v-if="enableSearch && enableSelect">
        <Select
          v-model.number="input2"
          @change="changePage(input2)"
          placeholder="Go"
          classInput=" w-[60px] h-9 "
          :options="options"
        >
        </Select>

        <span
          class="text-sm text-slate-900 dark:text-gray-50 inline-block ltr:ml-2 rtl:mr-2"
        >
          of {{ perPage }} entries</span
        >
      </div>
    </div>
    <ul class="pagination" :class="paginationClass">
      <li
        class="text-xl leading-4 text-gray-900 dark:text-gray-50 rtl:rotate-180"
      >
        <button
          @click.prevent="changePage(prevPage)"
          :disabled="current === 1"
          :class="current === 1 ? ' opacity-50 cursor-not-allowed' : ''"
        >
          <Icon
            name="material-symbols:chevron-left-rounded"
            v-if="!enableText"
          />
          <span v-if="enableText" class="text-sm inline-block rtl:-rotate-180"
            >Previous</span
          >
        </button>
      </li>
      <li class="" v-if="hasFirst()">
        <button @click.prevent="changePage(1)">
          <div>
            <span> 1 </span>
          </div>
        </button>
      </li>
      <li class="text-slate-700 dark:text-gray-300" v-if="hasFirst()">...</li>
      <li class="" v-for="(page, i) in pages" :key="i">
        <button @click.prevent="changePage(page)">
          <div
            :class="{
              active: current === page,
            }"
            class=""
          >
            <span class="">{{ page }}</span>
          </div>
        </button>
      </li>
      <li class="text-slate-700 dark:text-gray-300" v-if="hasLast()">...</li>
      <li class="" v-if="hasLast()">
        <button @click.prevent="changePage(totalPages)">
          <div>
            <span> {{ totalPages }} </span>
          </div>
        </button>
      </li>
      <li
        class="text-xl leading-4 text-slate-900 dark:text-gray-50 rtl:rotate-180"
      >
        <button
          @click.prevent="changePage(nextPage)"
          :disabled="current === totalPages"
          :class="current === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
        >
          <Icon
            name="material-symbols:chevron-right-rounded"
            v-if="!enableText"
          />
          <span v-if="enableText" class="text-sm rtl:-rotate-180 inline-block"
            >Next</span
          >
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["page-changed"]);

const props = defineProps({
  options: {
    type: Array as PropType<Array<any>>,
    default: () => [{}],
  },
  enableText: {
    type: Boolean,
    default: false,
  },
  enableInput: {
    type: Boolean,
    default: false,
  },
  enableSelect: {
    type: Boolean,
    default: false,
  },
  enableSearch: {
    type: Boolean,
    default: false,
  },
  pageChanged: {
    type: Function,
  },
  perPageChanged: {
    type: Function,
  },
  current: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  pageRange: {
    type: Number,
    default: 2,
  },
  textBeforeInput: {
    type: String,
    default: "Go to page",
  },
  textAfterInput: {
    type: String,
    default: "Go",
  },
  paginationClass: {
    type: String,
    default: "default",
  },
  searchClass: {
    type: String,
    default: "default",
  },
  wrapperClass: {
    type: String,
    default: "justify-between",
  },
});

const input = ref<string>("");
const input2 = ref(<any | null>null);

const pages = computed(() => {
  var pages = [];
  for (var i: number = rangeStart.value; i <= rangeEnd.value; i++) {
    pages.push(i);
  }
  return pages;
});
const rangeStart = computed(() => {
  var start = props.current - props.pageRange;
  return start > 0 ? start : 1;
});
const rangeEnd = computed(() => {
  var end = props.current - props.pageRange;
  return end < totalPages.value ? end : totalPages.value;
});
const totalPages = computed(() => {
  return Math.ceil(props.total / props.perPage);
});
const nextPage = computed(() => {
  return props.current + 1;
});
const prevPage = computed(() => {
  return props.current - 1;
});

function hasFirst() {
  return rangeStart.value !== 1;
}
function hasLast() {
  return rangeEnd.value < totalPages.value;
}
function hasPrev() {
  return props.current > 1;
}
function hasNext() {
  return props.current < totalPages.value;
}
function changePage(page: number) {
  if (page > 0 && page <= totalPages.value) {
    emit("page-changed", page);
  }
  if (props.pageChanged) {
    props.pageChanged({ currentPage: page });
  }
}
function customPerPageChange(page: number) {
  if (props.perPageChanged) {
    props.perPageChanged({ currentPerPage: page });
  }
}
</script>

<style scoped lang="scss">
.pagination {
  @apply flex items-center space-x-4 flex-wrap rtl:space-x-reverse;
  li {
    a,
    div {
      @apply bg-slate-900 text-slate-50 text-sm font-normal rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150;
      &.active {
        @apply bg-orange-600 dark:bg-orange-500 text-slate-50 font-medium;
      }
    }
  }
  &.bordered {
    @apply border border-[#D8DEE6] rounded-[3px] py-1 px-2;
    li {
      @apply text-slate-500;
      &:first-child,
      &:last-child {
        button {
          @apply hover:bg-slate-900 hover:text-white transition duration-150 text-slate-500 h-6 w-6 flex items-center justify-center rounded;
        }
      }
      a,
      div {
        @apply bg-transparent text-slate-500;
        &.active {
          @apply bg-slate-900 text-white;
        }
      }
    }
  }
  &.border-group {
    @apply border border-[#D8DEE6] rounded-[3px]  px-0 space-x-0 rtl:space-x-reverse;
    li {
      @apply border-r border-[#D8DEE5] h-full flex flex-col  justify-center px-3  last:border-none text-slate-500;
      a,
      div {
        @apply bg-transparent text-slate-500 dark:text-white h-auto w-auto;
        &.active {
          @apply text-slate-900 dark:text-white text-lg;
        }
      }
    }
  }
}
</style>
