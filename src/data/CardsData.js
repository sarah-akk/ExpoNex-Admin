import {
    UilEstate ,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilUsdSquare,
    UilMoneyWithdrawal,
} from "@iconscout/react-unicons";

export const CardsData = [
    {
        title : "Sales",
        color : {
            background : "linear-gradient(#D88C34 , #EDAA5C)",
            boxShadow : "0px 0px 0px 0px #e0c6f5",
        },
        barValue : 70,
        value : "25,970" ,
        png : UilUsdSquare,
        series :[
            {
                name : "Sales",
                data : [31 , 40 , 28 ,51 , 42 ,109 ,100]
            }
        ],
    },
    {
        title : "Revenue",
        color : {
            background : "linear-gradient(#AC582A , #F49866)",
            boxShadow : "0px 0px 0px 0px #e0c6f5",
        },
        barValue : 70,
        value : "14,270" ,
        png : UilMoneyWithdrawal,
        series :[
            {
                name : "Revenue",
                data : [10 , 100 , 50 ,70 , 80 ,30 ,40]
            }
        ],
    },
]

export const Expandedata = 
    {
        options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
}
;


