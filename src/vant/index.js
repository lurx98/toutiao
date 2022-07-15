import Vue from 'vue'
import { Button } from 'vant'
import { Tabbar, TabbarItem } from 'vant'
import { NavBar } from 'vant'
import { Form } from 'vant'
import { Field } from 'vant'
import { CountDown } from 'vant'
import { Toast } from 'vant'
import { Image as VanImage } from 'vant'
import { Grid, GridItem } from 'vant'
import { Cell, CellGroup } from 'vant'
import { Dialog } from 'vant'
import { Tab, Tabs } from 'vant'
import { Icon } from 'vant'
import { List } from 'vant'
import { PullRefresh } from 'vant'
import { Popup } from 'vant'
import { Search } from 'vant'
import { Loading } from 'vant'
import { Divider } from 'vant'

Vue.use(Divider)
Vue.use(Loading)
Vue.use(Search)

Vue.use(PullRefresh)
Vue.use(Popup)

Vue
    .use(List)
    .use(Icon)
    .use(Tab)
    .use(Tabs)
    .use(NavBar)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Button)
    .use(Form)
    .use(Field)
    .use(CountDown)
    .use(Toast)
    .use(VanImage)
    .use(Grid)
    .use(GridItem)
    .use(Cell)
    .use(CellGroup)
    .use(Dialog)
