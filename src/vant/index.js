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

Vue
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
