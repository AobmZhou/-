import * as echarts from "echarts/core"
import { TitleComponent, GridComponent } from "echarts/components"
import { BarChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
echarts.use([TitleComponent, GridComponent, BarChart, CanvasRenderer])