<template>
  <div id="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <!-- 如果type为input则使用el-input -->
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
              <!-- 如果type为select则使用el-select -->
              <el-select
                v-else-if="item.type === 'select'"
                v-bind="item.otherOptions"
                :placeholder="item.placeholder"
                style="width: 100%"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  >{{ option.title }}
                </el-option>
              </el-select>
              <!-- 如果类型为datepicker则使用el-date-picker -->
              <el-date-picker
                v-else-if="item.type === 'datepicker'"
                v-bind="item.otherOptions"
                range-separator="-"
                style="width: 100%"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { IFormItem } from '../types/index'
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      //设置传递的值为IFormItem所规范的类型
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    //自定义form宽度
    labelWidth: {
      type: String,
      default: () => '100px'
    },
    //自定义el-item的padding
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    //根据el-col属性来响应式布局
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    /* modelValue更新时触发,使得父组件数据更新 */
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange
    }
  },
  components: {}
})
</script>

<style scoped></style>
