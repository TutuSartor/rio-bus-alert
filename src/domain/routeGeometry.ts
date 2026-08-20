/**
 * Traçados Oficiais do GTFS da SMTR / Prefeitura do Rio de Janeiro
 * Coordenadas metro a metro no asfalto (shapes.txt oficial).
 */

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface RouteGeometry {
  lineNumber: string;
  name: string;
  color: string;
  coordinates: LatLng[];
}

export const RIO_BUS_ROUTES_GEOMETRY: Record<string, RouteGeometry> = {
  "323": {
    "lineNumber": "323",
    "name": "Linha 323",
    "color": "#059669",
    "coordinates": [
      {
        "latitude": -22.90883,
        "longitude": -43.17058
      },
      {
        "latitude": -22.90883,
        "longitude": -43.17059
      },
      {
        "latitude": -22.90867,
        "longitude": -43.17009
      },
      {
        "latitude": -22.9086,
        "longitude": -43.16992
      },
      {
        "latitude": -22.9088,
        "longitude": -43.16985
      },
      {
        "latitude": -22.90922,
        "longitude": -43.17118
      },
      {
        "latitude": -22.90935,
        "longitude": -43.17151
      },
      {
        "latitude": -22.90953,
        "longitude": -43.17178
      },
      {
        "latitude": -22.90959,
        "longitude": -43.17197
      },
      {
        "latitude": -22.90901,
        "longitude": -43.1722
      },
      {
        "latitude": -22.90856,
        "longitude": -43.17234
      },
      {
        "latitude": -22.908556,
        "longitude": -43.172341
      },
      {
        "latitude": -22.90826,
        "longitude": -43.17244
      },
      {
        "latitude": -22.90656,
        "longitude": -43.17306
      },
      {
        "latitude": -22.90597,
        "longitude": -43.17329
      },
      {
        "latitude": -22.90574,
        "longitude": -43.17343
      },
      {
        "latitude": -22.90526,
        "longitude": -43.17378
      },
      {
        "latitude": -22.9045,
        "longitude": -43.17434
      },
      {
        "latitude": -22.90406,
        "longitude": -43.17459
      },
      {
        "latitude": -22.90272,
        "longitude": -43.17562
      },
      {
        "latitude": -22.902718,
        "longitude": -43.175621
      },
      {
        "latitude": -22.90272,
        "longitude": -43.17562
      },
      {
        "latitude": -22.9024,
        "longitude": -43.17586
      },
      {
        "latitude": -22.90174,
        "longitude": -43.17629
      },
      {
        "latitude": -22.90135,
        "longitude": -43.17649
      },
      {
        "latitude": -22.9008,
        "longitude": -43.17673
      },
      {
        "latitude": -22.90052,
        "longitude": -43.17683
      },
      {
        "latitude": -22.90047,
        "longitude": -43.17693
      },
      {
        "latitude": -22.90043,
        "longitude": -43.17712
      },
      {
        "latitude": -22.90048,
        "longitude": -43.17755
      },
      {
        "latitude": -22.900588,
        "longitude": -43.177863
      },
      {
        "latitude": -22.90059,
        "longitude": -43.17787
      },
      {
        "latitude": -22.90072,
        "longitude": -43.17825
      },
      {
        "latitude": -22.90113,
        "longitude": -43.1792
      },
      {
        "latitude": -22.90121,
        "longitude": -43.17924
      },
      {
        "latitude": -22.90128,
        "longitude": -43.17934
      },
      {
        "latitude": -22.9013,
        "longitude": -43.1794
      },
      {
        "latitude": -22.90183,
        "longitude": -43.18105
      },
      {
        "latitude": -22.90183,
        "longitude": -43.18106
      },
      {
        "latitude": -22.90285,
        "longitude": -43.18421
      },
      {
        "latitude": -22.90301,
        "longitude": -43.18522
      },
      {
        "latitude": -22.903739,
        "longitude": -43.187506
      },
      {
        "latitude": -22.90374,
        "longitude": -43.18751
      },
      {
        "latitude": -22.90534,
        "longitude": -43.19244
      },
      {
        "latitude": -22.90598,
        "longitude": -43.19443
      },
      {
        "latitude": -22.90607,
        "longitude": -43.1948
      },
      {
        "latitude": -22.90631,
        "longitude": -43.19556
      },
      {
        "latitude": -22.9064,
        "longitude": -43.19589
      },
      {
        "latitude": -22.90776,
        "longitude": -43.20009
      },
      {
        "latitude": -22.90942,
        "longitude": -43.20524
      },
      {
        "latitude": -22.90945,
        "longitude": -43.20536
      },
      {
        "latitude": -22.90947,
        "longitude": -43.20554
      },
      {
        "latitude": -22.9095,
        "longitude": -43.20567
      },
      {
        "latitude": -22.90957,
        "longitude": -43.20591
      },
      {
        "latitude": -22.90957,
        "longitude": -43.20592
      },
      {
        "latitude": -22.90964,
        "longitude": -43.20611
      },
      {
        "latitude": -22.90988,
        "longitude": -43.20666
      },
      {
        "latitude": -22.90995,
        "longitude": -43.20686
      },
      {
        "latitude": -22.9101,
        "longitude": -43.20743
      },
      {
        "latitude": -22.91012,
        "longitude": -43.20758
      },
      {
        "latitude": -22.9101,
        "longitude": -43.20785
      },
      {
        "latitude": -22.90988,
        "longitude": -43.20893
      },
      {
        "latitude": -22.90983,
        "longitude": -43.20903
      },
      {
        "latitude": -22.90973,
        "longitude": -43.20913
      },
      {
        "latitude": -22.90956,
        "longitude": -43.20922
      },
      {
        "latitude": -22.90922,
        "longitude": -43.20929
      },
      {
        "latitude": -22.90801,
        "longitude": -43.20933
      },
      {
        "latitude": -22.90758,
        "longitude": -43.20936
      },
      {
        "latitude": -22.907574,
        "longitude": -43.20936
      },
      {
        "latitude": -22.906994,
        "longitude": -43.2094
      },
      {
        "latitude": -22.90655,
        "longitude": -43.20943
      },
      {
        "latitude": -22.90622,
        "longitude": -43.20935
      },
      {
        "latitude": -22.90616,
        "longitude": -43.20931
      },
      {
        "latitude": -22.90604,
        "longitude": -43.20917
      },
      {
        "latitude": -22.90587,
        "longitude": -43.20875
      },
      {
        "latitude": -22.90583,
        "longitude": -43.2087
      },
      {
        "latitude": -22.90573,
        "longitude": -43.20862
      },
      {
        "latitude": -22.90566,
        "longitude": -43.2086
      },
      {
        "latitude": -22.90557,
        "longitude": -43.20859
      },
      {
        "latitude": -22.90507,
        "longitude": -43.20861
      },
      {
        "latitude": -22.90499,
        "longitude": -43.20859
      },
      {
        "latitude": -22.90493,
        "longitude": -43.20856
      },
      {
        "latitude": -22.90487,
        "longitude": -43.20847
      },
      {
        "latitude": -22.90487,
        "longitude": -43.20832
      },
      {
        "latitude": -22.90492,
        "longitude": -43.20824
      },
      {
        "latitude": -22.90507,
        "longitude": -43.20817
      },
      {
        "latitude": -22.90514,
        "longitude": -43.20817
      },
      {
        "latitude": -22.90532,
        "longitude": -43.20823
      },
      {
        "latitude": -22.90556,
        "longitude": -43.20838
      },
      {
        "latitude": -22.90572,
        "longitude": -43.2085
      },
      {
        "latitude": -22.90589,
        "longitude": -43.20864
      },
      {
        "latitude": -22.90601,
        "longitude": -43.20877
      },
      {
        "latitude": -22.90612,
        "longitude": -43.20891
      },
      {
        "latitude": -22.90625,
        "longitude": -43.20917
      },
      {
        "latitude": -22.90632,
        "longitude": -43.20932
      },
      {
        "latitude": -22.90639,
        "longitude": -43.20953
      },
      {
        "latitude": -22.90644,
        "longitude": -43.2098
      },
      {
        "latitude": -22.90656,
        "longitude": -43.21107
      },
      {
        "latitude": -22.9066,
        "longitude": -43.21193
      },
      {
        "latitude": -22.90656,
        "longitude": -43.21233
      },
      {
        "latitude": -22.906532,
        "longitude": -43.212431
      },
      {
        "latitude": -22.90654,
        "longitude": -43.21244
      },
      {
        "latitude": -22.90643,
        "longitude": -43.2128
      },
      {
        "latitude": -22.90634,
        "longitude": -43.21302
      },
      {
        "latitude": -22.90622,
        "longitude": -43.21324
      },
      {
        "latitude": -22.90597,
        "longitude": -43.21361
      },
      {
        "latitude": -22.90583,
        "longitude": -43.2138
      },
      {
        "latitude": -22.9056,
        "longitude": -43.21403
      },
      {
        "latitude": -22.89871,
        "longitude": -43.21859
      },
      {
        "latitude": -22.8986,
        "longitude": -43.21865
      },
      {
        "latitude": -22.89813,
        "longitude": -43.21882
      },
      {
        "latitude": -22.89777,
        "longitude": -43.21892
      },
      {
        "latitude": -22.89671,
        "longitude": -43.21903
      },
      {
        "latitude": -22.89642,
        "longitude": -43.21907
      },
      {
        "latitude": -22.89608,
        "longitude": -43.21915
      },
      {
        "latitude": -22.89516,
        "longitude": -43.21951
      },
      {
        "latitude": -22.8947,
        "longitude": -43.21977
      },
      {
        "latitude": -22.89366,
        "longitude": -43.22057
      },
      {
        "latitude": -22.88375,
        "longitude": -43.22852
      },
      {
        "latitude": -22.88262,
        "longitude": -43.22957
      },
      {
        "latitude": -22.88194,
        "longitude": -43.23016
      },
      {
        "latitude": -22.88056,
        "longitude": -43.2311
      },
      {
        "latitude": -22.88004,
        "longitude": -43.23143
      },
      {
        "latitude": -22.87981,
        "longitude": -43.23155
      },
      {
        "latitude": -22.87951,
        "longitude": -43.2317
      },
      {
        "latitude": -22.8789,
        "longitude": -43.23194
      },
      {
        "latitude": -22.87832,
        "longitude": -43.23212
      },
      {
        "latitude": -22.87781,
        "longitude": -43.23224
      },
      {
        "latitude": -22.87755,
        "longitude": -43.23227
      },
      {
        "latitude": -22.87687,
        "longitude": -43.23232
      },
      {
        "latitude": -22.87635,
        "longitude": -43.23231
      },
      {
        "latitude": -22.87372,
        "longitude": -43.23215
      },
      {
        "latitude": -22.87332,
        "longitude": -43.23213
      },
      {
        "latitude": -22.87281,
        "longitude": -43.23214
      },
      {
        "latitude": -22.87244,
        "longitude": -43.23217
      },
      {
        "latitude": -22.87149,
        "longitude": -43.2323
      },
      {
        "latitude": -22.86996,
        "longitude": -43.23254
      },
      {
        "latitude": -22.86738,
        "longitude": -43.2328
      },
      {
        "latitude": -22.86658,
        "longitude": -43.23295
      },
      {
        "latitude": -22.86589,
        "longitude": -43.23315
      },
      {
        "latitude": -22.86517,
        "longitude": -43.23343
      },
      {
        "latitude": -22.8648,
        "longitude": -43.23361
      },
      {
        "latitude": -22.86447,
        "longitude": -43.23381
      },
      {
        "latitude": -22.86407,
        "longitude": -43.23414
      },
      {
        "latitude": -22.86391,
        "longitude": -43.23433
      },
      {
        "latitude": -22.86364,
        "longitude": -43.2347
      },
      {
        "latitude": -22.86293,
        "longitude": -43.23576
      },
      {
        "latitude": -22.86271,
        "longitude": -43.23601
      },
      {
        "latitude": -22.86229,
        "longitude": -43.23644
      },
      {
        "latitude": -22.86188,
        "longitude": -43.23676
      },
      {
        "latitude": -22.86133,
        "longitude": -43.23708
      },
      {
        "latitude": -22.86094,
        "longitude": -43.23727
      },
      {
        "latitude": -22.86053,
        "longitude": -43.23741
      },
      {
        "latitude": -22.8596,
        "longitude": -43.23762
      },
      {
        "latitude": -22.85772,
        "longitude": -43.23796
      },
      {
        "latitude": -22.85648,
        "longitude": -43.23821
      },
      {
        "latitude": -22.85517,
        "longitude": -43.23863
      },
      {
        "latitude": -22.85395,
        "longitude": -43.23911
      },
      {
        "latitude": -22.84967,
        "longitude": -43.24083
      },
      {
        "latitude": -22.84917,
        "longitude": -43.24097
      },
      {
        "latitude": -22.84877,
        "longitude": -43.24103
      },
      {
        "latitude": -22.8485,
        "longitude": -43.24104
      },
      {
        "latitude": -22.8481,
        "longitude": -43.24102
      },
      {
        "latitude": -22.84763,
        "longitude": -43.24093
      },
      {
        "latitude": -22.84714,
        "longitude": -43.24076
      },
      {
        "latitude": -22.84686,
        "longitude": -43.24063
      },
      {
        "latitude": -22.84647,
        "longitude": -43.2404
      },
      {
        "latitude": -22.84591,
        "longitude": -43.24003
      },
      {
        "latitude": -22.84569,
        "longitude": -43.23991
      },
      {
        "latitude": -22.84524,
        "longitude": -43.23971
      },
      {
        "latitude": -22.84479,
        "longitude": -43.23958
      },
      {
        "latitude": -22.84426,
        "longitude": -43.2394
      },
      {
        "latitude": -22.84407,
        "longitude": -43.23926
      },
      {
        "latitude": -22.84388,
        "longitude": -43.23908
      },
      {
        "latitude": -22.84382,
        "longitude": -43.23905
      },
      {
        "latitude": -22.84375,
        "longitude": -43.23903
      },
      {
        "latitude": -22.84356,
        "longitude": -43.23905
      },
      {
        "latitude": -22.84327,
        "longitude": -43.23911
      },
      {
        "latitude": -22.84293,
        "longitude": -43.23917
      },
      {
        "latitude": -22.84275,
        "longitude": -43.23918
      },
      {
        "latitude": -22.8423,
        "longitude": -43.23917
      },
      {
        "latitude": -22.84212,
        "longitude": -43.23919
      },
      {
        "latitude": -22.84171,
        "longitude": -43.2393
      },
      {
        "latitude": -22.84153,
        "longitude": -43.23937
      },
      {
        "latitude": -22.84091,
        "longitude": -43.23976
      },
      {
        "latitude": -22.84074,
        "longitude": -43.23992
      },
      {
        "latitude": -22.84014,
        "longitude": -43.24054
      },
      {
        "latitude": -22.83944,
        "longitude": -43.24111
      },
      {
        "latitude": -22.83932,
        "longitude": -43.24116
      },
      {
        "latitude": -22.83918,
        "longitude": -43.24118
      },
      {
        "latitude": -22.83907,
        "longitude": -43.24103
      },
      {
        "latitude": -22.83876,
        "longitude": -43.24067
      },
      {
        "latitude": -22.83862,
        "longitude": -43.24049
      },
      {
        "latitude": -22.83861,
        "longitude": -43.24043
      },
      {
        "latitude": -22.8386,
        "longitude": -43.24027
      },
      {
        "latitude": -22.83862,
        "longitude": -43.24015
      },
      {
        "latitude": -22.83876,
        "longitude": -43.23999
      },
      {
        "latitude": -22.83896,
        "longitude": -43.23982
      },
      {
        "latitude": -22.83931,
        "longitude": -43.23952
      },
      {
        "latitude": -22.83931,
        "longitude": -43.23952
      },
      {
        "latitude": -22.83987,
        "longitude": -43.23906
      },
      {
        "latitude": -22.83974,
        "longitude": -43.23888
      },
      {
        "latitude": -22.83965,
        "longitude": -43.23883
      },
      {
        "latitude": -22.83956,
        "longitude": -43.23883
      },
      {
        "latitude": -22.83917,
        "longitude": -43.23927
      },
      {
        "latitude": -22.83852,
        "longitude": -43.23983
      },
      {
        "latitude": -22.83843,
        "longitude": -43.23991
      },
      {
        "latitude": -22.8384,
        "longitude": -43.23994
      },
      {
        "latitude": -22.83834,
        "longitude": -43.24022
      },
      {
        "latitude": -22.83835,
        "longitude": -43.2403
      },
      {
        "latitude": -22.83842,
        "longitude": -43.2404
      },
      {
        "latitude": -22.83857,
        "longitude": -43.24053
      },
      {
        "latitude": -22.83878,
        "longitude": -43.24082
      },
      {
        "latitude": -22.83902,
        "longitude": -43.24109
      },
      {
        "latitude": -22.83909,
        "longitude": -43.24124
      },
      {
        "latitude": -22.83909,
        "longitude": -43.24133
      },
      {
        "latitude": -22.83906,
        "longitude": -43.24141
      },
      {
        "latitude": -22.8383,
        "longitude": -43.24207
      },
      {
        "latitude": -22.83813,
        "longitude": -43.24216
      },
      {
        "latitude": -22.83784,
        "longitude": -43.24225
      },
      {
        "latitude": -22.83758,
        "longitude": -43.24227
      },
      {
        "latitude": -22.83734,
        "longitude": -43.24226
      },
      {
        "latitude": -22.83385,
        "longitude": -43.24193
      },
      {
        "latitude": -22.83375,
        "longitude": -43.24188
      },
      {
        "latitude": -22.83369,
        "longitude": -43.24184
      },
      {
        "latitude": -22.83357,
        "longitude": -43.24169
      },
      {
        "latitude": -22.83352,
        "longitude": -43.24149
      },
      {
        "latitude": -22.83352,
        "longitude": -43.24135
      },
      {
        "latitude": -22.83369,
        "longitude": -43.24082
      },
      {
        "latitude": -22.83376,
        "longitude": -43.24051
      },
      {
        "latitude": -22.83378,
        "longitude": -43.24015
      },
      {
        "latitude": -22.83375,
        "longitude": -43.23974
      },
      {
        "latitude": -22.83371,
        "longitude": -43.23956
      },
      {
        "latitude": -22.83361,
        "longitude": -43.23928
      },
      {
        "latitude": -22.83352,
        "longitude": -43.23911
      },
      {
        "latitude": -22.833313,
        "longitude": -43.238821
      },
      {
        "latitude": -22.83298,
        "longitude": -43.23838
      },
      {
        "latitude": -22.83264,
        "longitude": -43.238
      },
      {
        "latitude": -22.83232,
        "longitude": -43.23769
      },
      {
        "latitude": -22.83197,
        "longitude": -43.2374
      },
      {
        "latitude": -22.83153,
        "longitude": -43.23711
      },
      {
        "latitude": -22.83055,
        "longitude": -43.23665
      },
      {
        "latitude": -22.83015,
        "longitude": -43.23644
      },
      {
        "latitude": -22.82955,
        "longitude": -43.23605
      },
      {
        "latitude": -22.82912,
        "longitude": -43.23582
      },
      {
        "latitude": -22.82874,
        "longitude": -43.23557
      },
      {
        "latitude": -22.8281,
        "longitude": -43.23508
      },
      {
        "latitude": -22.8259,
        "longitude": -43.23325
      },
      {
        "latitude": -22.82569,
        "longitude": -43.23298
      },
      {
        "latitude": -22.82558,
        "longitude": -43.2328
      },
      {
        "latitude": -22.82506,
        "longitude": -43.23205
      },
      {
        "latitude": -22.82473,
        "longitude": -43.23164
      },
      {
        "latitude": -22.82458,
        "longitude": -43.23152
      },
      {
        "latitude": -22.82411,
        "longitude": -43.23126
      },
      {
        "latitude": -22.8239,
        "longitude": -43.23113
      },
      {
        "latitude": -22.82365,
        "longitude": -43.23093
      },
      {
        "latitude": -22.82311,
        "longitude": -43.23045
      },
      {
        "latitude": -22.82291,
        "longitude": -43.23026
      },
      {
        "latitude": -22.82267,
        "longitude": -43.22999
      },
      {
        "latitude": -22.82126,
        "longitude": -43.22829
      },
      {
        "latitude": -22.82125,
        "longitude": -43.22831
      },
      {
        "latitude": -22.82069,
        "longitude": -43.22765
      },
      {
        "latitude": -22.82058,
        "longitude": -43.22749
      },
      {
        "latitude": -22.81889,
        "longitude": -43.22564
      },
      {
        "latitude": -22.81868,
        "longitude": -43.22544
      },
      {
        "latitude": -22.81762,
        "longitude": -43.2243
      },
      {
        "latitude": -22.817617,
        "longitude": -43.224297
      },
      {
        "latitude": -22.81584,
        "longitude": -43.22239
      },
      {
        "latitude": -22.81546,
        "longitude": -43.22199
      },
      {
        "latitude": -22.81495,
        "longitude": -43.22151
      },
      {
        "latitude": -22.81478,
        "longitude": -43.22136
      },
      {
        "latitude": -22.8134,
        "longitude": -43.22032
      },
      {
        "latitude": -22.81325,
        "longitude": -43.22019
      },
      {
        "latitude": -22.81302,
        "longitude": -43.21991
      },
      {
        "latitude": -22.81289,
        "longitude": -43.21973
      },
      {
        "latitude": -22.8123,
        "longitude": -43.2187
      },
      {
        "latitude": -22.81157,
        "longitude": -43.21749
      },
      {
        "latitude": -22.81105,
        "longitude": -43.21665
      },
      {
        "latitude": -22.81079,
        "longitude": -43.21633
      },
      {
        "latitude": -22.8104,
        "longitude": -43.21598
      },
      {
        "latitude": -22.81009,
        "longitude": -43.2158
      },
      {
        "latitude": -22.80855,
        "longitude": -43.21515
      },
      {
        "latitude": -22.80747,
        "longitude": -43.21467
      },
      {
        "latitude": -22.80709,
        "longitude": -43.2145
      },
      {
        "latitude": -22.80684,
        "longitude": -43.21436
      },
      {
        "latitude": -22.80668,
        "longitude": -43.21423
      },
      {
        "latitude": -22.80643,
        "longitude": -43.21396
      },
      {
        "latitude": -22.8063,
        "longitude": -43.21375
      },
      {
        "latitude": -22.80619,
        "longitude": -43.21352
      },
      {
        "latitude": -22.80609,
        "longitude": -43.21326
      },
      {
        "latitude": -22.80592,
        "longitude": -43.21255
      },
      {
        "latitude": -22.80581,
        "longitude": -43.2119
      },
      {
        "latitude": -22.80575,
        "longitude": -43.21154
      },
      {
        "latitude": -22.80575,
        "longitude": -43.21108
      },
      {
        "latitude": -22.80579,
        "longitude": -43.21086
      },
      {
        "latitude": -22.80589,
        "longitude": -43.21055
      },
      {
        "latitude": -22.8059,
        "longitude": -43.2104
      },
      {
        "latitude": -22.80583,
        "longitude": -43.20994
      },
      {
        "latitude": -22.80577,
        "longitude": -43.20967
      },
      {
        "latitude": -22.80553,
        "longitude": -43.20884
      },
      {
        "latitude": -22.80497,
        "longitude": -43.2068
      },
      {
        "latitude": -22.80484,
        "longitude": -43.20637
      },
      {
        "latitude": -22.80465,
        "longitude": -43.20603
      },
      {
        "latitude": -22.80455,
        "longitude": -43.20592
      },
      {
        "latitude": -22.8045,
        "longitude": -43.20581
      },
      {
        "latitude": -22.80427,
        "longitude": -43.20466
      },
      {
        "latitude": -22.80421,
        "longitude": -43.20417
      },
      {
        "latitude": -22.80421,
        "longitude": -43.20395
      },
      {
        "latitude": -22.80424,
        "longitude": -43.20373
      },
      {
        "latitude": -22.80433,
        "longitude": -43.20334
      },
      {
        "latitude": -22.8045,
        "longitude": -43.20302
      },
      {
        "latitude": -22.80479,
        "longitude": -43.20247
      },
      {
        "latitude": -22.80597,
        "longitude": -43.20036
      },
      {
        "latitude": -22.80606,
        "longitude": -43.20013
      },
      {
        "latitude": -22.80627,
        "longitude": -43.19963
      },
      {
        "latitude": -22.80659,
        "longitude": -43.19866
      },
      {
        "latitude": -22.80679,
        "longitude": -43.19818
      },
      {
        "latitude": -22.80697,
        "longitude": -43.19791
      },
      {
        "latitude": -22.80748,
        "longitude": -43.1974
      },
      {
        "latitude": -22.80812,
        "longitude": -43.1968
      },
      {
        "latitude": -22.80888,
        "longitude": -43.19611
      },
      {
        "latitude": -22.80929,
        "longitude": -43.19579
      },
      {
        "latitude": -22.80965,
        "longitude": -43.19557
      },
      {
        "latitude": -22.81033,
        "longitude": -43.19516
      },
      {
        "latitude": -22.81045,
        "longitude": -43.19507
      },
      {
        "latitude": -22.81067,
        "longitude": -43.19486
      },
      {
        "latitude": -22.81082,
        "longitude": -43.19463
      },
      {
        "latitude": -22.81107,
        "longitude": -43.19415
      },
      {
        "latitude": -22.81215,
        "longitude": -43.19191
      },
      {
        "latitude": -22.81216,
        "longitude": -43.19181
      },
      {
        "latitude": -22.81214,
        "longitude": -43.19169
      },
      {
        "latitude": -22.81204,
        "longitude": -43.19154
      },
      {
        "latitude": -22.8119,
        "longitude": -43.19142
      },
      {
        "latitude": -22.81168,
        "longitude": -43.19112
      },
      {
        "latitude": -22.81142,
        "longitude": -43.19049
      },
      {
        "latitude": -22.81125,
        "longitude": -43.18997
      },
      {
        "latitude": -22.81104,
        "longitude": -43.18936
      },
      {
        "latitude": -22.81099,
        "longitude": -43.18911
      },
      {
        "latitude": -22.81082,
        "longitude": -43.18717
      },
      {
        "latitude": -22.8108,
        "longitude": -43.18681
      },
      {
        "latitude": -22.81084,
        "longitude": -43.18524
      },
      {
        "latitude": -22.8109,
        "longitude": -43.18498
      },
      {
        "latitude": -22.81102,
        "longitude": -43.18461
      },
      {
        "latitude": -22.81115,
        "longitude": -43.18417
      },
      {
        "latitude": -22.81127,
        "longitude": -43.18392
      },
      {
        "latitude": -22.81099,
        "longitude": -43.18377
      },
      {
        "latitude": -22.81079,
        "longitude": -43.18379
      },
      {
        "latitude": -22.81058,
        "longitude": -43.18379
      },
      {
        "latitude": -22.81045,
        "longitude": -43.18376
      },
      {
        "latitude": -22.80985,
        "longitude": -43.18346
      },
      {
        "latitude": -22.80905,
        "longitude": -43.18306
      },
      {
        "latitude": -22.80832,
        "longitude": -43.18274
      },
      {
        "latitude": -22.80819,
        "longitude": -43.18262
      },
      {
        "latitude": -22.80783,
        "longitude": -43.18217
      },
      {
        "latitude": -22.80749,
        "longitude": -43.18181
      },
      {
        "latitude": -22.80716,
        "longitude": -43.18158
      },
      {
        "latitude": -22.80696,
        "longitude": -43.18154
      },
      {
        "latitude": -22.80684,
        "longitude": -43.18155
      },
      {
        "latitude": -22.80671,
        "longitude": -43.1816
      },
      {
        "latitude": -22.80666,
        "longitude": -43.18169
      },
      {
        "latitude": -22.80654,
        "longitude": -43.18181
      },
      {
        "latitude": -22.80631,
        "longitude": -43.18194
      },
      {
        "latitude": -22.80609,
        "longitude": -43.18202
      },
      {
        "latitude": -22.80605,
        "longitude": -43.18203
      },
      {
        "latitude": -22.8059,
        "longitude": -43.18201
      },
      {
        "latitude": -22.8058,
        "longitude": -43.18196
      },
      {
        "latitude": -22.80542,
        "longitude": -43.18149
      },
      {
        "latitude": -22.80534,
        "longitude": -43.18141
      },
      {
        "latitude": -22.80525,
        "longitude": -43.18138
      },
      {
        "latitude": -22.80505,
        "longitude": -43.18137
      },
      {
        "latitude": -22.80476,
        "longitude": -43.1814
      },
      {
        "latitude": -22.8039,
        "longitude": -43.18139
      },
      {
        "latitude": -22.80331,
        "longitude": -43.18137
      },
      {
        "latitude": -22.80319,
        "longitude": -43.18142
      },
      {
        "latitude": -22.80307,
        "longitude": -43.18153
      },
      {
        "latitude": -22.80293,
        "longitude": -43.18167
      },
      {
        "latitude": -22.80271,
        "longitude": -43.18194
      },
      {
        "latitude": -22.80261,
        "longitude": -43.18203
      },
      {
        "latitude": -22.80245,
        "longitude": -43.18209
      },
      {
        "latitude": -22.80229,
        "longitude": -43.1821
      },
      {
        "latitude": -22.80194,
        "longitude": -43.18209
      },
      {
        "latitude": -22.80136,
        "longitude": -43.18224
      },
      {
        "latitude": -22.8005,
        "longitude": -43.18247
      },
      {
        "latitude": -22.80013,
        "longitude": -43.1826
      },
      {
        "latitude": -22.79992,
        "longitude": -43.18271
      },
      {
        "latitude": -22.79971,
        "longitude": -43.1829
      },
      {
        "latitude": -22.79902,
        "longitude": -43.18351
      },
      {
        "latitude": -22.79854,
        "longitude": -43.18369
      },
      {
        "latitude": -22.7978,
        "longitude": -43.18391
      },
      {
        "latitude": -22.79727,
        "longitude": -43.18406
      },
      {
        "latitude": -22.79718,
        "longitude": -43.18407
      },
      {
        "latitude": -22.79698,
        "longitude": -43.18404
      },
      {
        "latitude": -22.79681,
        "longitude": -43.18398
      },
      {
        "latitude": -22.79661,
        "longitude": -43.18388
      },
      {
        "latitude": -22.79564,
        "longitude": -43.18294
      },
      {
        "latitude": -22.79558,
        "longitude": -43.18288
      },
      {
        "latitude": -22.79543,
        "longitude": -43.18268
      },
      {
        "latitude": -22.79532,
        "longitude": -43.18243
      },
      {
        "latitude": -22.79516,
        "longitude": -43.18172
      },
      {
        "latitude": -22.7952,
        "longitude": -43.18039
      },
      {
        "latitude": -22.7952,
        "longitude": -43.1803
      },
      {
        "latitude": -22.79523,
        "longitude": -43.18008
      },
      {
        "latitude": -22.79555,
        "longitude": -43.17932
      },
      {
        "latitude": -22.79565,
        "longitude": -43.17907
      },
      {
        "latitude": -22.79566,
        "longitude": -43.17892
      },
      {
        "latitude": -22.79567,
        "longitude": -43.17867
      },
      {
        "latitude": -22.79558,
        "longitude": -43.17793
      },
      {
        "latitude": -22.79548,
        "longitude": -43.17759
      },
      {
        "latitude": -22.79536,
        "longitude": -43.17739
      },
      {
        "latitude": -22.79519,
        "longitude": -43.17722
      },
      {
        "latitude": -22.79501,
        "longitude": -43.17711
      },
      {
        "latitude": -22.79426,
        "longitude": -43.17679
      },
      {
        "latitude": -22.79407,
        "longitude": -43.17663
      },
      {
        "latitude": -22.79393,
        "longitude": -43.17595
      },
      {
        "latitude": -22.794,
        "longitude": -43.17564
      },
      {
        "latitude": -22.79404,
        "longitude": -43.17555
      },
      {
        "latitude": -22.79426,
        "longitude": -43.17528
      },
      {
        "latitude": -22.79435,
        "longitude": -43.17511
      },
      {
        "latitude": -22.79458,
        "longitude": -43.17392
      },
      {
        "latitude": -22.79461,
        "longitude": -43.17369
      },
      {
        "latitude": -22.79454,
        "longitude": -43.17316
      },
      {
        "latitude": -22.79438,
        "longitude": -43.17215
      },
      {
        "latitude": -22.79432,
        "longitude": -43.17201
      },
      {
        "latitude": -22.79368,
        "longitude": -43.17108
      },
      {
        "latitude": -22.79361,
        "longitude": -43.17079
      },
      {
        "latitude": -22.79354,
        "longitude": -43.17049
      },
      {
        "latitude": -22.7935,
        "longitude": -43.17037
      },
      {
        "latitude": -22.79343,
        "longitude": -43.17031
      },
      {
        "latitude": -22.79335,
        "longitude": -43.17028
      },
      {
        "latitude": -22.79307,
        "longitude": -43.17023
      },
      {
        "latitude": -22.79294,
        "longitude": -43.17019
      },
      {
        "latitude": -22.79229,
        "longitude": -43.16951
      },
      {
        "latitude": -22.7919,
        "longitude": -43.1691
      },
      {
        "latitude": -22.79115,
        "longitude": -43.16823
      },
      {
        "latitude": -22.79101,
        "longitude": -43.16794
      },
      {
        "latitude": -22.79022,
        "longitude": -43.16603
      },
      {
        "latitude": -22.78956,
        "longitude": -43.1646
      },
      {
        "latitude": -22.78924,
        "longitude": -43.16397
      },
      {
        "latitude": -22.78908,
        "longitude": -43.16365
      },
      {
        "latitude": -22.78847,
        "longitude": -43.16258
      },
      {
        "latitude": -22.78912,
        "longitude": -43.16193
      }
    ]
  },
  "324": {
    "lineNumber": "324",
    "name": "Linha 324",
    "color": "#0284C7",
    "coordinates": [
      {
        "latitude": -22.90236,
        "longitude": -43.18168
      },
      {
        "latitude": -22.90236,
        "longitude": -43.18169
      },
      {
        "latitude": -22.902,
        "longitude": -43.18051
      },
      {
        "latitude": -22.90159,
        "longitude": -43.17929
      },
      {
        "latitude": -22.90144,
        "longitude": -43.17906
      },
      {
        "latitude": -22.90135,
        "longitude": -43.17884
      },
      {
        "latitude": -22.90124,
        "longitude": -43.17806
      },
      {
        "latitude": -22.90097,
        "longitude": -43.17725
      },
      {
        "latitude": -22.90082,
        "longitude": -43.17697
      },
      {
        "latitude": -22.90075,
        "longitude": -43.1769
      },
      {
        "latitude": -22.90064,
        "longitude": -43.17683
      },
      {
        "latitude": -22.90058,
        "longitude": -43.17681
      },
      {
        "latitude": -22.90052,
        "longitude": -43.17683
      },
      {
        "latitude": -22.90047,
        "longitude": -43.17693
      },
      {
        "latitude": -22.90043,
        "longitude": -43.17712
      },
      {
        "latitude": -22.90048,
        "longitude": -43.17755
      },
      {
        "latitude": -22.900588,
        "longitude": -43.177863
      },
      {
        "latitude": -22.90059,
        "longitude": -43.17787
      },
      {
        "latitude": -22.90072,
        "longitude": -43.17825
      },
      {
        "latitude": -22.90113,
        "longitude": -43.1792
      },
      {
        "latitude": -22.90121,
        "longitude": -43.17924
      },
      {
        "latitude": -22.90128,
        "longitude": -43.17934
      },
      {
        "latitude": -22.9013,
        "longitude": -43.1794
      },
      {
        "latitude": -22.90183,
        "longitude": -43.18105
      },
      {
        "latitude": -22.90183,
        "longitude": -43.18106
      },
      {
        "latitude": -22.90285,
        "longitude": -43.18421
      },
      {
        "latitude": -22.90301,
        "longitude": -43.18522
      },
      {
        "latitude": -22.903738,
        "longitude": -43.187485
      },
      {
        "latitude": -22.90374,
        "longitude": -43.18749
      },
      {
        "latitude": -22.90534,
        "longitude": -43.19244
      },
      {
        "latitude": -22.90598,
        "longitude": -43.19443
      },
      {
        "latitude": -22.90607,
        "longitude": -43.1948
      },
      {
        "latitude": -22.90631,
        "longitude": -43.19556
      },
      {
        "latitude": -22.9064,
        "longitude": -43.19589
      },
      {
        "latitude": -22.90776,
        "longitude": -43.20009
      },
      {
        "latitude": -22.90942,
        "longitude": -43.20524
      },
      {
        "latitude": -22.90945,
        "longitude": -43.20536
      },
      {
        "latitude": -22.90947,
        "longitude": -43.20554
      },
      {
        "latitude": -22.9095,
        "longitude": -43.20567
      },
      {
        "latitude": -22.90957,
        "longitude": -43.20591
      },
      {
        "latitude": -22.90957,
        "longitude": -43.20592
      },
      {
        "latitude": -22.90964,
        "longitude": -43.20611
      },
      {
        "latitude": -22.90988,
        "longitude": -43.20666
      },
      {
        "latitude": -22.90995,
        "longitude": -43.20686
      },
      {
        "latitude": -22.9101,
        "longitude": -43.20743
      },
      {
        "latitude": -22.91012,
        "longitude": -43.20758
      },
      {
        "latitude": -22.9101,
        "longitude": -43.20785
      },
      {
        "latitude": -22.90988,
        "longitude": -43.20893
      },
      {
        "latitude": -22.90983,
        "longitude": -43.20903
      },
      {
        "latitude": -22.90973,
        "longitude": -43.20913
      },
      {
        "latitude": -22.90956,
        "longitude": -43.20922
      },
      {
        "latitude": -22.90922,
        "longitude": -43.20929
      },
      {
        "latitude": -22.90811,
        "longitude": -43.20949
      },
      {
        "latitude": -22.90716,
        "longitude": -43.20955
      },
      {
        "latitude": -22.90715,
        "longitude": -43.209551
      },
      {
        "latitude": -22.90339,
        "longitude": -43.20979
      },
      {
        "latitude": -22.903388,
        "longitude": -43.20979
      },
      {
        "latitude": -22.90339,
        "longitude": -43.20979
      },
      {
        "latitude": -22.89971,
        "longitude": -43.21004
      },
      {
        "latitude": -22.8995,
        "longitude": -43.21008
      },
      {
        "latitude": -22.89932,
        "longitude": -43.21013
      },
      {
        "latitude": -22.89914,
        "longitude": -43.21027
      },
      {
        "latitude": -22.89771,
        "longitude": -43.21179
      },
      {
        "latitude": -22.89734,
        "longitude": -43.21215
      },
      {
        "latitude": -22.89708,
        "longitude": -43.21234
      },
      {
        "latitude": -22.89685,
        "longitude": -43.21247
      },
      {
        "latitude": -22.89628,
        "longitude": -43.21277
      },
      {
        "latitude": -22.89542,
        "longitude": -43.21305
      },
      {
        "latitude": -22.89325,
        "longitude": -43.21405
      },
      {
        "latitude": -22.89285,
        "longitude": -43.21425
      },
      {
        "latitude": -22.89244,
        "longitude": -43.21437
      },
      {
        "latitude": -22.89212,
        "longitude": -43.21451
      },
      {
        "latitude": -22.89164,
        "longitude": -43.21479
      },
      {
        "latitude": -22.89124,
        "longitude": -43.21497
      },
      {
        "latitude": -22.89044,
        "longitude": -43.21538
      },
      {
        "latitude": -22.88943,
        "longitude": -43.21585
      },
      {
        "latitude": -22.88926,
        "longitude": -43.21595
      },
      {
        "latitude": -22.88913,
        "longitude": -43.21617
      },
      {
        "latitude": -22.88903,
        "longitude": -43.21641
      },
      {
        "latitude": -22.88875,
        "longitude": -43.21734
      },
      {
        "latitude": -22.88873,
        "longitude": -43.21748
      },
      {
        "latitude": -22.88867,
        "longitude": -43.220012
      },
      {
        "latitude": -22.88867,
        "longitude": -43.22002
      },
      {
        "latitude": -22.88863,
        "longitude": -43.22175
      },
      {
        "latitude": -22.8886,
        "longitude": -43.22203
      },
      {
        "latitude": -22.88856,
        "longitude": -43.22221
      },
      {
        "latitude": -22.8885,
        "longitude": -43.22239
      },
      {
        "latitude": -22.88832,
        "longitude": -43.22271
      },
      {
        "latitude": -22.88812,
        "longitude": -43.22295
      },
      {
        "latitude": -22.88741,
        "longitude": -43.22364
      },
      {
        "latitude": -22.88585,
        "longitude": -43.22522
      },
      {
        "latitude": -22.88498,
        "longitude": -43.22605
      },
      {
        "latitude": -22.88487,
        "longitude": -43.22618
      },
      {
        "latitude": -22.88478,
        "longitude": -43.22632
      },
      {
        "latitude": -22.8847,
        "longitude": -43.22653
      },
      {
        "latitude": -22.8846,
        "longitude": -43.22684
      },
      {
        "latitude": -22.88462,
        "longitude": -43.22707
      },
      {
        "latitude": -22.88469,
        "longitude": -43.22742
      },
      {
        "latitude": -22.88488,
        "longitude": -43.22806
      },
      {
        "latitude": -22.885,
        "longitude": -43.22835
      },
      {
        "latitude": -22.88515,
        "longitude": -43.22857
      },
      {
        "latitude": -22.88551,
        "longitude": -43.22904
      },
      {
        "latitude": -22.88634,
        "longitude": -43.23007
      },
      {
        "latitude": -22.88653,
        "longitude": -43.23034
      },
      {
        "latitude": -22.88675,
        "longitude": -43.23072
      },
      {
        "latitude": -22.88689,
        "longitude": -43.23111
      },
      {
        "latitude": -22.88699,
        "longitude": -43.23156
      },
      {
        "latitude": -22.88701,
        "longitude": -43.23177
      },
      {
        "latitude": -22.887,
        "longitude": -43.23208
      },
      {
        "latitude": -22.88698,
        "longitude": -43.23229
      },
      {
        "latitude": -22.88689,
        "longitude": -43.23274
      },
      {
        "latitude": -22.8868,
        "longitude": -43.23303
      },
      {
        "latitude": -22.88663,
        "longitude": -43.23338
      },
      {
        "latitude": -22.88655,
        "longitude": -43.23353
      },
      {
        "latitude": -22.88631,
        "longitude": -43.23389
      },
      {
        "latitude": -22.8856,
        "longitude": -43.23456
      },
      {
        "latitude": -22.88531,
        "longitude": -43.23481
      },
      {
        "latitude": -22.88404,
        "longitude": -43.23598
      },
      {
        "latitude": -22.88191,
        "longitude": -43.23799
      },
      {
        "latitude": -22.88126,
        "longitude": -43.23851
      },
      {
        "latitude": -22.88031,
        "longitude": -43.2392
      },
      {
        "latitude": -22.87974,
        "longitude": -43.23957
      },
      {
        "latitude": -22.87757,
        "longitude": -43.24106
      },
      {
        "latitude": -22.87536,
        "longitude": -43.24266
      },
      {
        "latitude": -22.87535,
        "longitude": -43.24264
      },
      {
        "latitude": -22.87509,
        "longitude": -43.24287
      },
      {
        "latitude": -22.87316,
        "longitude": -43.24438
      },
      {
        "latitude": -22.87288,
        "longitude": -43.24463
      },
      {
        "latitude": -22.87127,
        "longitude": -43.24583
      },
      {
        "latitude": -22.87046,
        "longitude": -43.24634
      },
      {
        "latitude": -22.86972,
        "longitude": -43.24671
      },
      {
        "latitude": -22.86902,
        "longitude": -43.24696
      },
      {
        "latitude": -22.8681,
        "longitude": -43.24716
      },
      {
        "latitude": -22.86689,
        "longitude": -43.24734
      },
      {
        "latitude": -22.8657,
        "longitude": -43.24755
      },
      {
        "latitude": -22.86453,
        "longitude": -43.24767
      },
      {
        "latitude": -22.86453,
        "longitude": -43.24767
      },
      {
        "latitude": -22.86426,
        "longitude": -43.2477
      },
      {
        "latitude": -22.8639,
        "longitude": -43.2477
      },
      {
        "latitude": -22.86089,
        "longitude": -43.24761
      },
      {
        "latitude": -22.860887,
        "longitude": -43.24761
      },
      {
        "latitude": -22.86089,
        "longitude": -43.24761
      },
      {
        "latitude": -22.85689,
        "longitude": -43.24749
      },
      {
        "latitude": -22.856883,
        "longitude": -43.24749
      },
      {
        "latitude": -22.85689,
        "longitude": -43.24749
      },
      {
        "latitude": -22.85374,
        "longitude": -43.24741
      },
      {
        "latitude": -22.853734,
        "longitude": -43.24741
      },
      {
        "latitude": -22.85374,
        "longitude": -43.24741
      },
      {
        "latitude": -22.85315,
        "longitude": -43.24741
      },
      {
        "latitude": -22.85182,
        "longitude": -43.24733
      },
      {
        "latitude": -22.85167,
        "longitude": -43.24731
      },
      {
        "latitude": -22.851667,
        "longitude": -43.247309
      },
      {
        "latitude": -22.85112,
        "longitude": -43.24721
      },
      {
        "latitude": -22.85094,
        "longitude": -43.24714
      },
      {
        "latitude": -22.85019,
        "longitude": -43.24681
      },
      {
        "latitude": -22.84988,
        "longitude": -43.24663
      },
      {
        "latitude": -22.84955,
        "longitude": -43.2464
      },
      {
        "latitude": -22.849,
        "longitude": -43.24595
      },
      {
        "latitude": -22.84871,
        "longitude": -43.24567
      },
      {
        "latitude": -22.848174,
        "longitude": -43.245103
      },
      {
        "latitude": -22.84818,
        "longitude": -43.24511
      },
      {
        "latitude": -22.84762,
        "longitude": -43.24448
      },
      {
        "latitude": -22.84743,
        "longitude": -43.24423
      },
      {
        "latitude": -22.84727,
        "longitude": -43.24395
      },
      {
        "latitude": -22.84714,
        "longitude": -43.24365
      },
      {
        "latitude": -22.84683,
        "longitude": -43.24261
      },
      {
        "latitude": -22.84679,
        "longitude": -43.24242
      },
      {
        "latitude": -22.84664,
        "longitude": -43.24082
      },
      {
        "latitude": -22.84661,
        "longitude": -43.24062
      },
      {
        "latitude": -22.84655,
        "longitude": -43.24034
      },
      {
        "latitude": -22.84649,
        "longitude": -43.2402
      },
      {
        "latitude": -22.84641,
        "longitude": -43.24005
      },
      {
        "latitude": -22.84578,
        "longitude": -43.23913
      },
      {
        "latitude": -22.84563,
        "longitude": -43.23896
      },
      {
        "latitude": -22.84546,
        "longitude": -43.23882
      },
      {
        "latitude": -22.84515,
        "longitude": -43.23867
      },
      {
        "latitude": -22.84501,
        "longitude": -43.23863
      },
      {
        "latitude": -22.84484,
        "longitude": -43.2386
      },
      {
        "latitude": -22.84463,
        "longitude": -43.2386
      },
      {
        "latitude": -22.84426,
        "longitude": -43.23871
      },
      {
        "latitude": -22.84357,
        "longitude": -43.23901
      },
      {
        "latitude": -22.84327,
        "longitude": -43.23911
      },
      {
        "latitude": -22.84293,
        "longitude": -43.23917
      },
      {
        "latitude": -22.84275,
        "longitude": -43.23918
      },
      {
        "latitude": -22.8423,
        "longitude": -43.23917
      },
      {
        "latitude": -22.84212,
        "longitude": -43.23919
      },
      {
        "latitude": -22.84171,
        "longitude": -43.2393
      },
      {
        "latitude": -22.84153,
        "longitude": -43.23937
      },
      {
        "latitude": -22.84091,
        "longitude": -43.23976
      },
      {
        "latitude": -22.84074,
        "longitude": -43.23992
      },
      {
        "latitude": -22.84014,
        "longitude": -43.24054
      },
      {
        "latitude": -22.83944,
        "longitude": -43.24111
      },
      {
        "latitude": -22.83932,
        "longitude": -43.24116
      },
      {
        "latitude": -22.83918,
        "longitude": -43.24118
      },
      {
        "latitude": -22.83907,
        "longitude": -43.24103
      },
      {
        "latitude": -22.83876,
        "longitude": -43.24067
      },
      {
        "latitude": -22.83862,
        "longitude": -43.24049
      },
      {
        "latitude": -22.83861,
        "longitude": -43.24043
      },
      {
        "latitude": -22.8386,
        "longitude": -43.24027
      },
      {
        "latitude": -22.83862,
        "longitude": -43.24015
      },
      {
        "latitude": -22.83876,
        "longitude": -43.23999
      },
      {
        "latitude": -22.839084,
        "longitude": -43.239715
      },
      {
        "latitude": -22.83909,
        "longitude": -43.23971
      },
      {
        "latitude": -22.83931,
        "longitude": -43.23952
      },
      {
        "latitude": -22.83987,
        "longitude": -43.23906
      },
      {
        "latitude": -22.83974,
        "longitude": -43.23888
      },
      {
        "latitude": -22.83965,
        "longitude": -43.23883
      },
      {
        "latitude": -22.83956,
        "longitude": -43.23883
      },
      {
        "latitude": -22.83917,
        "longitude": -43.23927
      },
      {
        "latitude": -22.83852,
        "longitude": -43.23983
      },
      {
        "latitude": -22.83843,
        "longitude": -43.23991
      },
      {
        "latitude": -22.8384,
        "longitude": -43.23994
      },
      {
        "latitude": -22.83834,
        "longitude": -43.24022
      },
      {
        "latitude": -22.83835,
        "longitude": -43.2403
      },
      {
        "latitude": -22.83842,
        "longitude": -43.2404
      },
      {
        "latitude": -22.83857,
        "longitude": -43.24053
      },
      {
        "latitude": -22.83878,
        "longitude": -43.24082
      },
      {
        "latitude": -22.83902,
        "longitude": -43.24109
      },
      {
        "latitude": -22.83909,
        "longitude": -43.24124
      },
      {
        "latitude": -22.83909,
        "longitude": -43.24133
      },
      {
        "latitude": -22.83906,
        "longitude": -43.24141
      },
      {
        "latitude": -22.8383,
        "longitude": -43.24207
      },
      {
        "latitude": -22.83813,
        "longitude": -43.24216
      },
      {
        "latitude": -22.83784,
        "longitude": -43.24225
      },
      {
        "latitude": -22.83758,
        "longitude": -43.24227
      },
      {
        "latitude": -22.83734,
        "longitude": -43.24226
      },
      {
        "latitude": -22.83385,
        "longitude": -43.24193
      },
      {
        "latitude": -22.83375,
        "longitude": -43.24188
      },
      {
        "latitude": -22.83369,
        "longitude": -43.24184
      },
      {
        "latitude": -22.83357,
        "longitude": -43.24169
      },
      {
        "latitude": -22.83352,
        "longitude": -43.24149
      },
      {
        "latitude": -22.83352,
        "longitude": -43.24135
      },
      {
        "latitude": -22.83369,
        "longitude": -43.24082
      },
      {
        "latitude": -22.83376,
        "longitude": -43.24051
      },
      {
        "latitude": -22.83378,
        "longitude": -43.24015
      },
      {
        "latitude": -22.83375,
        "longitude": -43.23974
      },
      {
        "latitude": -22.83371,
        "longitude": -43.23956
      },
      {
        "latitude": -22.83361,
        "longitude": -43.23928
      },
      {
        "latitude": -22.83352,
        "longitude": -43.23911
      },
      {
        "latitude": -22.83331,
        "longitude": -43.23882
      },
      {
        "latitude": -22.833303,
        "longitude": -43.238811
      },
      {
        "latitude": -22.83298,
        "longitude": -43.23838
      },
      {
        "latitude": -22.83264,
        "longitude": -43.238
      },
      {
        "latitude": -22.83232,
        "longitude": -43.23769
      },
      {
        "latitude": -22.83197,
        "longitude": -43.2374
      },
      {
        "latitude": -22.83153,
        "longitude": -43.23711
      },
      {
        "latitude": -22.83055,
        "longitude": -43.23665
      },
      {
        "latitude": -22.83015,
        "longitude": -43.23644
      },
      {
        "latitude": -22.82955,
        "longitude": -43.23605
      },
      {
        "latitude": -22.82912,
        "longitude": -43.23582
      },
      {
        "latitude": -22.82874,
        "longitude": -43.23557
      },
      {
        "latitude": -22.8281,
        "longitude": -43.23508
      },
      {
        "latitude": -22.8259,
        "longitude": -43.23325
      },
      {
        "latitude": -22.82569,
        "longitude": -43.23298
      },
      {
        "latitude": -22.82558,
        "longitude": -43.2328
      },
      {
        "latitude": -22.82506,
        "longitude": -43.23205
      },
      {
        "latitude": -22.82473,
        "longitude": -43.23164
      },
      {
        "latitude": -22.82458,
        "longitude": -43.23152
      },
      {
        "latitude": -22.82411,
        "longitude": -43.23126
      },
      {
        "latitude": -22.8239,
        "longitude": -43.23113
      },
      {
        "latitude": -22.82365,
        "longitude": -43.23093
      },
      {
        "latitude": -22.82311,
        "longitude": -43.23045
      },
      {
        "latitude": -22.82291,
        "longitude": -43.23026
      },
      {
        "latitude": -22.82267,
        "longitude": -43.22999
      },
      {
        "latitude": -22.82126,
        "longitude": -43.22829
      },
      {
        "latitude": -22.82125,
        "longitude": -43.22831
      },
      {
        "latitude": -22.82069,
        "longitude": -43.22765
      },
      {
        "latitude": -22.82058,
        "longitude": -43.22749
      },
      {
        "latitude": -22.81889,
        "longitude": -43.22564
      },
      {
        "latitude": -22.81868,
        "longitude": -43.22544
      },
      {
        "latitude": -22.8176,
        "longitude": -43.22428
      },
      {
        "latitude": -22.817595,
        "longitude": -43.224275
      },
      {
        "latitude": -22.81584,
        "longitude": -43.22239
      },
      {
        "latitude": -22.81546,
        "longitude": -43.22199
      },
      {
        "latitude": -22.81495,
        "longitude": -43.22151
      },
      {
        "latitude": -22.81478,
        "longitude": -43.22136
      },
      {
        "latitude": -22.8134,
        "longitude": -43.22032
      },
      {
        "latitude": -22.81325,
        "longitude": -43.22019
      },
      {
        "latitude": -22.81302,
        "longitude": -43.21991
      },
      {
        "latitude": -22.81289,
        "longitude": -43.21973
      },
      {
        "latitude": -22.8123,
        "longitude": -43.2187
      },
      {
        "latitude": -22.81157,
        "longitude": -43.21749
      },
      {
        "latitude": -22.81105,
        "longitude": -43.21665
      },
      {
        "latitude": -22.81079,
        "longitude": -43.21633
      },
      {
        "latitude": -22.8104,
        "longitude": -43.21598
      },
      {
        "latitude": -22.81009,
        "longitude": -43.2158
      },
      {
        "latitude": -22.80855,
        "longitude": -43.21515
      },
      {
        "latitude": -22.80747,
        "longitude": -43.21467
      },
      {
        "latitude": -22.80709,
        "longitude": -43.2145
      },
      {
        "latitude": -22.80684,
        "longitude": -43.21436
      },
      {
        "latitude": -22.80668,
        "longitude": -43.21423
      },
      {
        "latitude": -22.80643,
        "longitude": -43.21396
      },
      {
        "latitude": -22.8063,
        "longitude": -43.21375
      },
      {
        "latitude": -22.80619,
        "longitude": -43.21352
      },
      {
        "latitude": -22.80609,
        "longitude": -43.21326
      },
      {
        "latitude": -22.80592,
        "longitude": -43.21255
      },
      {
        "latitude": -22.80581,
        "longitude": -43.2119
      },
      {
        "latitude": -22.80575,
        "longitude": -43.21154
      },
      {
        "latitude": -22.80575,
        "longitude": -43.21108
      },
      {
        "latitude": -22.80579,
        "longitude": -43.21086
      },
      {
        "latitude": -22.80589,
        "longitude": -43.21055
      },
      {
        "latitude": -22.8059,
        "longitude": -43.2104
      },
      {
        "latitude": -22.80583,
        "longitude": -43.20994
      },
      {
        "latitude": -22.80604,
        "longitude": -43.20965
      },
      {
        "latitude": -22.80622,
        "longitude": -43.20944
      },
      {
        "latitude": -22.80684,
        "longitude": -43.20861
      },
      {
        "latitude": -22.80767,
        "longitude": -43.2075
      },
      {
        "latitude": -22.80775,
        "longitude": -43.20743
      },
      {
        "latitude": -22.80786,
        "longitude": -43.20738
      },
      {
        "latitude": -22.80807,
        "longitude": -43.20737
      },
      {
        "latitude": -22.80821,
        "longitude": -43.20739
      },
      {
        "latitude": -22.80842,
        "longitude": -43.20749
      },
      {
        "latitude": -22.80878,
        "longitude": -43.20802
      },
      {
        "latitude": -22.80902,
        "longitude": -43.20823
      },
      {
        "latitude": -22.80924,
        "longitude": -43.20839
      },
      {
        "latitude": -22.80954,
        "longitude": -43.20857
      },
      {
        "latitude": -22.80988,
        "longitude": -43.20868
      },
      {
        "latitude": -22.81011,
        "longitude": -43.20872
      },
      {
        "latitude": -22.81035,
        "longitude": -43.20879
      },
      {
        "latitude": -22.81048,
        "longitude": -43.20881
      },
      {
        "latitude": -22.81083,
        "longitude": -43.20877
      },
      {
        "latitude": -22.81115,
        "longitude": -43.20875
      },
      {
        "latitude": -22.81142,
        "longitude": -43.20867
      },
      {
        "latitude": -22.81167,
        "longitude": -43.20858
      },
      {
        "latitude": -22.81227,
        "longitude": -43.20824
      },
      {
        "latitude": -22.81245,
        "longitude": -43.20811
      },
      {
        "latitude": -22.81274,
        "longitude": -43.2078
      },
      {
        "latitude": -22.81328,
        "longitude": -43.2071
      },
      {
        "latitude": -22.81347,
        "longitude": -43.20694
      },
      {
        "latitude": -22.81366,
        "longitude": -43.2068
      },
      {
        "latitude": -22.81399,
        "longitude": -43.20662
      },
      {
        "latitude": -22.81424,
        "longitude": -43.20651
      },
      {
        "latitude": -22.81443,
        "longitude": -43.20647
      },
      {
        "latitude": -22.81484,
        "longitude": -43.20643
      },
      {
        "latitude": -22.81521,
        "longitude": -43.20634
      },
      {
        "latitude": -22.81553,
        "longitude": -43.2062
      },
      {
        "latitude": -22.81576,
        "longitude": -43.20606
      },
      {
        "latitude": -22.8159,
        "longitude": -43.20596
      },
      {
        "latitude": -22.81608,
        "longitude": -43.20577
      },
      {
        "latitude": -22.81626,
        "longitude": -43.20554
      },
      {
        "latitude": -22.81649,
        "longitude": -43.20508
      },
      {
        "latitude": -22.81669,
        "longitude": -43.20456
      },
      {
        "latitude": -22.81716,
        "longitude": -43.20331
      },
      {
        "latitude": -22.81731,
        "longitude": -43.20308
      },
      {
        "latitude": -22.81742,
        "longitude": -43.20294
      },
      {
        "latitude": -22.81777,
        "longitude": -43.20265
      },
      {
        "latitude": -22.81804,
        "longitude": -43.20254
      },
      {
        "latitude": -22.81835,
        "longitude": -43.20244
      },
      {
        "latitude": -22.81932,
        "longitude": -43.20211
      },
      {
        "latitude": -22.81934,
        "longitude": -43.20208
      },
      {
        "latitude": -22.81935,
        "longitude": -43.20203
      },
      {
        "latitude": -22.81901,
        "longitude": -43.2006
      },
      {
        "latitude": -22.81896,
        "longitude": -43.20039
      },
      {
        "latitude": -22.81879,
        "longitude": -43.19965
      },
      {
        "latitude": -22.81856,
        "longitude": -43.19804
      },
      {
        "latitude": -22.81845,
        "longitude": -43.19723
      },
      {
        "latitude": -22.81843,
        "longitude": -43.19674
      },
      {
        "latitude": -22.81847,
        "longitude": -43.19617
      },
      {
        "latitude": -22.81855,
        "longitude": -43.1955
      },
      {
        "latitude": -22.8187,
        "longitude": -43.1946
      },
      {
        "latitude": -22.81879,
        "longitude": -43.19408
      },
      {
        "latitude": -22.81895,
        "longitude": -43.19347
      },
      {
        "latitude": -22.81904,
        "longitude": -43.1932
      },
      {
        "latitude": -22.81912,
        "longitude": -43.19296
      },
      {
        "latitude": -22.81937,
        "longitude": -43.19236
      },
      {
        "latitude": -22.81958,
        "longitude": -43.19193
      },
      {
        "latitude": -22.81996,
        "longitude": -43.19089
      },
      {
        "latitude": -22.82003,
        "longitude": -43.19051
      },
      {
        "latitude": -22.82004,
        "longitude": -43.19017
      },
      {
        "latitude": -22.82013,
        "longitude": -43.18864
      },
      {
        "latitude": -22.81944,
        "longitude": -43.18849
      },
      {
        "latitude": -22.81898,
        "longitude": -43.18836
      },
      {
        "latitude": -22.81892,
        "longitude": -43.18833
      },
      {
        "latitude": -22.8179,
        "longitude": -43.18784
      },
      {
        "latitude": -22.81758,
        "longitude": -43.18774
      },
      {
        "latitude": -22.81706,
        "longitude": -43.18763
      },
      {
        "latitude": -22.81654,
        "longitude": -43.18751
      },
      {
        "latitude": -22.81657,
        "longitude": -43.18737
      },
      {
        "latitude": -22.81657,
        "longitude": -43.18708
      },
      {
        "latitude": -22.81654,
        "longitude": -43.18658
      },
      {
        "latitude": -22.81654,
        "longitude": -43.18629
      },
      {
        "latitude": -22.81657,
        "longitude": -43.18621
      },
      {
        "latitude": -22.81664,
        "longitude": -43.18599
      },
      {
        "latitude": -22.81697,
        "longitude": -43.18553
      },
      {
        "latitude": -22.8173,
        "longitude": -43.18539
      },
      {
        "latitude": -22.81797,
        "longitude": -43.18519
      },
      {
        "latitude": -22.81841,
        "longitude": -43.18506
      },
      {
        "latitude": -22.81859,
        "longitude": -43.18493
      },
      {
        "latitude": -22.81868,
        "longitude": -43.18485
      },
      {
        "latitude": -22.8188,
        "longitude": -43.18469
      },
      {
        "latitude": -22.81891,
        "longitude": -43.18448
      },
      {
        "latitude": -22.81893,
        "longitude": -43.1844
      },
      {
        "latitude": -22.81903,
        "longitude": -43.18374
      },
      {
        "latitude": -22.81914,
        "longitude": -43.18299
      },
      {
        "latitude": -22.81922,
        "longitude": -43.18277
      },
      {
        "latitude": -22.81934,
        "longitude": -43.18264
      },
      {
        "latitude": -22.81997,
        "longitude": -43.18245
      },
      {
        "latitude": -22.82014,
        "longitude": -43.18238
      },
      {
        "latitude": -22.82024,
        "longitude": -43.18229
      },
      {
        "latitude": -22.8203,
        "longitude": -43.1822
      },
      {
        "latitude": -22.82037,
        "longitude": -43.18205
      },
      {
        "latitude": -22.82051,
        "longitude": -43.18148
      },
      {
        "latitude": -22.82053,
        "longitude": -43.18122
      },
      {
        "latitude": -22.82054,
        "longitude": -43.18018
      },
      {
        "latitude": -22.82061,
        "longitude": -43.17979
      },
      {
        "latitude": -22.8206,
        "longitude": -43.17879
      },
      {
        "latitude": -22.82061,
        "longitude": -43.17866
      },
      {
        "latitude": -22.82071,
        "longitude": -43.17835
      },
      {
        "latitude": -22.82081,
        "longitude": -43.17815
      },
      {
        "latitude": -22.82087,
        "longitude": -43.17809
      },
      {
        "latitude": -22.82128,
        "longitude": -43.17771
      },
      {
        "latitude": -22.82193,
        "longitude": -43.17724
      },
      {
        "latitude": -22.82288,
        "longitude": -43.17654
      },
      {
        "latitude": -22.82303,
        "longitude": -43.17639
      },
      {
        "latitude": -22.8232,
        "longitude": -43.1762
      },
      {
        "latitude": -22.82338,
        "longitude": -43.17594
      },
      {
        "latitude": -22.82353,
        "longitude": -43.17568
      },
      {
        "latitude": -22.82358,
        "longitude": -43.17558
      },
      {
        "latitude": -22.82366,
        "longitude": -43.17536
      },
      {
        "latitude": -22.82371,
        "longitude": -43.17521
      },
      {
        "latitude": -22.82382,
        "longitude": -43.17465
      },
      {
        "latitude": -22.82392,
        "longitude": -43.17429
      },
      {
        "latitude": -22.82411,
        "longitude": -43.17378
      },
      {
        "latitude": -22.82426,
        "longitude": -43.17354
      },
      {
        "latitude": -22.82444,
        "longitude": -43.17335
      },
      {
        "latitude": -22.82481,
        "longitude": -43.17302
      },
      {
        "latitude": -22.82531,
        "longitude": -43.17257
      },
      {
        "latitude": -22.82539,
        "longitude": -43.17241
      },
      {
        "latitude": -22.82539,
        "longitude": -43.17233
      },
      {
        "latitude": -22.82537,
        "longitude": -43.17219
      },
      {
        "latitude": -22.82492,
        "longitude": -43.17004
      },
      {
        "latitude": -22.82561,
        "longitude": -43.16971
      },
      {
        "latitude": -22.82571,
        "longitude": -43.16964
      },
      {
        "latitude": -22.82582,
        "longitude": -43.16951
      },
      {
        "latitude": -22.82578,
        "longitude": -43.16944
      },
      {
        "latitude": -22.82574,
        "longitude": -43.1694
      },
      {
        "latitude": -22.82552,
        "longitude": -43.16931
      }
    ]
  },
  "457": {
    "lineNumber": "457",
    "name": "Linha 457",
    "color": "#8B5CF6",
    "coordinates": [
      {
        "latitude": -22.88574,
        "longitude": -43.30054
      },
      {
        "latitude": -22.88556,
        "longitude": -43.30065
      },
      {
        "latitude": -22.88542,
        "longitude": -43.30069
      },
      {
        "latitude": -22.88541,
        "longitude": -43.30032
      },
      {
        "latitude": -22.88539,
        "longitude": -43.29948
      },
      {
        "latitude": -22.8852,
        "longitude": -43.2986
      },
      {
        "latitude": -22.88512,
        "longitude": -43.2984
      },
      {
        "latitude": -22.88509,
        "longitude": -43.29836
      },
      {
        "latitude": -22.88492,
        "longitude": -43.29825
      },
      {
        "latitude": -22.88475,
        "longitude": -43.29808
      },
      {
        "latitude": -22.88458,
        "longitude": -43.29788
      },
      {
        "latitude": -22.88338,
        "longitude": -43.29653
      },
      {
        "latitude": -22.8829,
        "longitude": -43.29602
      },
      {
        "latitude": -22.88266,
        "longitude": -43.29566
      },
      {
        "latitude": -22.88196,
        "longitude": -43.29477
      },
      {
        "latitude": -22.88185,
        "longitude": -43.29462
      },
      {
        "latitude": -22.88179,
        "longitude": -43.2945
      },
      {
        "latitude": -22.88174,
        "longitude": -43.29435
      },
      {
        "latitude": -22.88156,
        "longitude": -43.29373
      },
      {
        "latitude": -22.88156,
        "longitude": -43.29359
      },
      {
        "latitude": -22.88163,
        "longitude": -43.29346
      },
      {
        "latitude": -22.88297,
        "longitude": -43.29224
      },
      {
        "latitude": -22.88414,
        "longitude": -43.29124
      },
      {
        "latitude": -22.88546,
        "longitude": -43.29011
      },
      {
        "latitude": -22.88578,
        "longitude": -43.28971
      },
      {
        "latitude": -22.88593,
        "longitude": -43.2895
      },
      {
        "latitude": -22.88627,
        "longitude": -43.28889
      },
      {
        "latitude": -22.88647,
        "longitude": -43.28863
      },
      {
        "latitude": -22.88671,
        "longitude": -43.28828
      },
      {
        "latitude": -22.8869,
        "longitude": -43.28782
      },
      {
        "latitude": -22.88714,
        "longitude": -43.28719
      },
      {
        "latitude": -22.88738,
        "longitude": -43.28638
      },
      {
        "latitude": -22.88763,
        "longitude": -43.28558
      },
      {
        "latitude": -22.88765,
        "longitude": -43.28523
      },
      {
        "latitude": -22.88767,
        "longitude": -43.28392
      },
      {
        "latitude": -22.88768,
        "longitude": -43.28303
      },
      {
        "latitude": -22.88763,
        "longitude": -43.28273
      },
      {
        "latitude": -22.88734,
        "longitude": -43.2815
      },
      {
        "latitude": -22.88721,
        "longitude": -43.28101
      },
      {
        "latitude": -22.88713,
        "longitude": -43.28079
      },
      {
        "latitude": -22.88697,
        "longitude": -43.28043
      },
      {
        "latitude": -22.88685,
        "longitude": -43.28022
      },
      {
        "latitude": -22.8867,
        "longitude": -43.27999
      },
      {
        "latitude": -22.88587,
        "longitude": -43.27903
      },
      {
        "latitude": -22.88536,
        "longitude": -43.27843
      },
      {
        "latitude": -22.88673,
        "longitude": -43.27787
      },
      {
        "latitude": -22.88828,
        "longitude": -43.27724
      },
      {
        "latitude": -22.8884,
        "longitude": -43.27717
      },
      {
        "latitude": -22.88816,
        "longitude": -43.27686
      },
      {
        "latitude": -22.88759,
        "longitude": -43.27612
      },
      {
        "latitude": -22.88827,
        "longitude": -43.27542
      },
      {
        "latitude": -22.88885,
        "longitude": -43.27452
      },
      {
        "latitude": -22.88902,
        "longitude": -43.27425
      },
      {
        "latitude": -22.8891,
        "longitude": -43.27417
      },
      {
        "latitude": -22.88921,
        "longitude": -43.27409
      },
      {
        "latitude": -22.8895,
        "longitude": -43.27394
      },
      {
        "latitude": -22.88985,
        "longitude": -43.27381
      },
      {
        "latitude": -22.89007,
        "longitude": -43.27375
      },
      {
        "latitude": -22.89023,
        "longitude": -43.27376
      },
      {
        "latitude": -22.89066,
        "longitude": -43.27382
      },
      {
        "latitude": -22.89081,
        "longitude": -43.27391
      },
      {
        "latitude": -22.89165,
        "longitude": -43.27456
      },
      {
        "latitude": -22.89314,
        "longitude": -43.27572
      },
      {
        "latitude": -22.89539,
        "longitude": -43.2775
      },
      {
        "latitude": -22.89585,
        "longitude": -43.27786
      },
      {
        "latitude": -22.89613,
        "longitude": -43.27805
      },
      {
        "latitude": -22.89687,
        "longitude": -43.27867
      },
      {
        "latitude": -22.89765,
        "longitude": -43.27927
      },
      {
        "latitude": -22.89809,
        "longitude": -43.27961
      },
      {
        "latitude": -22.89823,
        "longitude": -43.27966
      },
      {
        "latitude": -22.89832,
        "longitude": -43.27967
      },
      {
        "latitude": -22.89917,
        "longitude": -43.27868
      },
      {
        "latitude": -22.8993,
        "longitude": -43.27856
      },
      {
        "latitude": -22.89942,
        "longitude": -43.27856
      },
      {
        "latitude": -22.89954,
        "longitude": -43.27867
      },
      {
        "latitude": -22.89993,
        "longitude": -43.27907
      },
      {
        "latitude": -22.90018,
        "longitude": -43.27938
      },
      {
        "latitude": -22.90027,
        "longitude": -43.2796
      },
      {
        "latitude": -22.9003,
        "longitude": -43.27973
      },
      {
        "latitude": -22.9003,
        "longitude": -43.27988
      },
      {
        "latitude": -22.90025,
        "longitude": -43.28012
      },
      {
        "latitude": -22.9002,
        "longitude": -43.28021
      },
      {
        "latitude": -22.90007,
        "longitude": -43.28038
      },
      {
        "latitude": -22.8998,
        "longitude": -43.28067
      },
      {
        "latitude": -22.89976,
        "longitude": -43.28082
      },
      {
        "latitude": -22.89978,
        "longitude": -43.28101
      },
      {
        "latitude": -22.89987,
        "longitude": -43.28117
      },
      {
        "latitude": -22.90055,
        "longitude": -43.28188
      },
      {
        "latitude": -22.90101,
        "longitude": -43.28137
      },
      {
        "latitude": -22.90141,
        "longitude": -43.28097
      },
      {
        "latitude": -22.90158,
        "longitude": -43.28078
      },
      {
        "latitude": -22.90192,
        "longitude": -43.28039
      },
      {
        "latitude": -22.902,
        "longitude": -43.28032
      },
      {
        "latitude": -22.9024,
        "longitude": -43.28015
      },
      {
        "latitude": -22.90288,
        "longitude": -43.2797
      },
      {
        "latitude": -22.90347,
        "longitude": -43.27908
      },
      {
        "latitude": -22.90382,
        "longitude": -43.27874
      },
      {
        "latitude": -22.90419,
        "longitude": -43.27838
      },
      {
        "latitude": -22.90433,
        "longitude": -43.27823
      },
      {
        "latitude": -22.90463,
        "longitude": -43.27782
      },
      {
        "latitude": -22.90572,
        "longitude": -43.27683
      },
      {
        "latitude": -22.90594,
        "longitude": -43.27663
      },
      {
        "latitude": -22.90615,
        "longitude": -43.27651
      },
      {
        "latitude": -22.90682,
        "longitude": -43.2762
      },
      {
        "latitude": -22.90782,
        "longitude": -43.27561
      },
      {
        "latitude": -22.90844,
        "longitude": -43.27523
      },
      {
        "latitude": -22.90851,
        "longitude": -43.27515
      },
      {
        "latitude": -22.90856,
        "longitude": -43.27506
      },
      {
        "latitude": -22.90861,
        "longitude": -43.27492
      },
      {
        "latitude": -22.90862,
        "longitude": -43.27478
      },
      {
        "latitude": -22.90858,
        "longitude": -43.27464
      },
      {
        "latitude": -22.90819,
        "longitude": -43.27388
      },
      {
        "latitude": -22.90808,
        "longitude": -43.27365
      },
      {
        "latitude": -22.90802,
        "longitude": -43.27348
      },
      {
        "latitude": -22.90799,
        "longitude": -43.27332
      },
      {
        "latitude": -22.90795,
        "longitude": -43.27218
      },
      {
        "latitude": -22.90762,
        "longitude": -43.27201
      },
      {
        "latitude": -22.90667,
        "longitude": -43.27119
      },
      {
        "latitude": -22.90647,
        "longitude": -43.271
      },
      {
        "latitude": -22.90558,
        "longitude": -43.27015
      },
      {
        "latitude": -22.90524,
        "longitude": -43.27004
      },
      {
        "latitude": -22.90521,
        "longitude": -43.26997
      },
      {
        "latitude": -22.90517,
        "longitude": -43.26984
      },
      {
        "latitude": -22.90503,
        "longitude": -43.26782
      },
      {
        "latitude": -22.90498,
        "longitude": -43.26717
      },
      {
        "latitude": -22.90493,
        "longitude": -43.26613
      },
      {
        "latitude": -22.9048,
        "longitude": -43.26503
      },
      {
        "latitude": -22.90474,
        "longitude": -43.26487
      },
      {
        "latitude": -22.90459,
        "longitude": -43.26456
      },
      {
        "latitude": -22.90419,
        "longitude": -43.26375
      },
      {
        "latitude": -22.90412,
        "longitude": -43.26353
      },
      {
        "latitude": -22.90408,
        "longitude": -43.26333
      },
      {
        "latitude": -22.90403,
        "longitude": -43.26271
      },
      {
        "latitude": -22.90395,
        "longitude": -43.26066
      },
      {
        "latitude": -22.9038,
        "longitude": -43.25889
      },
      {
        "latitude": -22.90372,
        "longitude": -43.25796
      },
      {
        "latitude": -22.90347,
        "longitude": -43.25581
      },
      {
        "latitude": -22.90322,
        "longitude": -43.25346
      },
      {
        "latitude": -22.90312,
        "longitude": -43.25246
      },
      {
        "latitude": -22.90297,
        "longitude": -43.25058
      },
      {
        "latitude": -22.9029,
        "longitude": -43.24981
      },
      {
        "latitude": -22.90285,
        "longitude": -43.24877
      },
      {
        "latitude": -22.90286,
        "longitude": -43.24877
      },
      {
        "latitude": -22.90285,
        "longitude": -43.24853
      },
      {
        "latitude": -22.90299,
        "longitude": -43.24771
      },
      {
        "latitude": -22.90318,
        "longitude": -43.246781
      },
      {
        "latitude": -22.90318,
        "longitude": -43.24678
      },
      {
        "latitude": -22.90338,
        "longitude": -43.24575
      },
      {
        "latitude": -22.90346,
        "longitude": -43.24551
      },
      {
        "latitude": -22.90351,
        "longitude": -43.24539
      },
      {
        "latitude": -22.90448,
        "longitude": -43.24469
      },
      {
        "latitude": -22.90477,
        "longitude": -43.24448
      },
      {
        "latitude": -22.90553,
        "longitude": -43.24387
      },
      {
        "latitude": -22.90586,
        "longitude": -43.24356
      },
      {
        "latitude": -22.906,
        "longitude": -43.24339
      },
      {
        "latitude": -22.90611,
        "longitude": -43.24319
      },
      {
        "latitude": -22.90628,
        "longitude": -43.2428
      },
      {
        "latitude": -22.90637,
        "longitude": -43.24253
      },
      {
        "latitude": -22.9064,
        "longitude": -43.24238
      },
      {
        "latitude": -22.90641,
        "longitude": -43.24221
      },
      {
        "latitude": -22.9064,
        "longitude": -43.24195
      },
      {
        "latitude": -22.90625,
        "longitude": -43.24127
      },
      {
        "latitude": -22.90624,
        "longitude": -43.24113
      },
      {
        "latitude": -22.90627,
        "longitude": -43.24082
      },
      {
        "latitude": -22.90633,
        "longitude": -43.24063
      },
      {
        "latitude": -22.90683,
        "longitude": -43.23969
      },
      {
        "latitude": -22.90703,
        "longitude": -43.23949
      },
      {
        "latitude": -22.90753,
        "longitude": -43.23915
      },
      {
        "latitude": -22.90816,
        "longitude": -43.23876
      },
      {
        "latitude": -22.9088,
        "longitude": -43.23866
      },
      {
        "latitude": -22.9092,
        "longitude": -43.23856
      },
      {
        "latitude": -22.9096,
        "longitude": -43.23848
      },
      {
        "latitude": -22.90994,
        "longitude": -43.23838
      },
      {
        "latitude": -22.91027,
        "longitude": -43.23826
      },
      {
        "latitude": -22.91071,
        "longitude": -43.23806
      },
      {
        "latitude": -22.91143,
        "longitude": -43.23759
      },
      {
        "latitude": -22.91179,
        "longitude": -43.23728
      },
      {
        "latitude": -22.912,
        "longitude": -43.23702
      },
      {
        "latitude": -22.91235,
        "longitude": -43.23659
      },
      {
        "latitude": -22.91321,
        "longitude": -43.23544
      },
      {
        "latitude": -22.9133,
        "longitude": -43.2353
      },
      {
        "latitude": -22.91347,
        "longitude": -43.23494
      },
      {
        "latitude": -22.9136,
        "longitude": -43.2345
      },
      {
        "latitude": -22.91376,
        "longitude": -43.23397
      },
      {
        "latitude": -22.91404,
        "longitude": -43.23374
      },
      {
        "latitude": -22.91432,
        "longitude": -43.23347
      },
      {
        "latitude": -22.91554,
        "longitude": -43.23225
      },
      {
        "latitude": -22.91564,
        "longitude": -43.23207
      },
      {
        "latitude": -22.91572,
        "longitude": -43.23179
      },
      {
        "latitude": -22.91595,
        "longitude": -43.23092
      },
      {
        "latitude": -22.91612,
        "longitude": -43.23017
      },
      {
        "latitude": -22.91623,
        "longitude": -43.22985
      },
      {
        "latitude": -22.91607,
        "longitude": -43.22969
      },
      {
        "latitude": -22.91546,
        "longitude": -43.22919
      },
      {
        "latitude": -22.915455,
        "longitude": -43.229186
      },
      {
        "latitude": -22.91546,
        "longitude": -43.22919
      },
      {
        "latitude": -22.91472,
        "longitude": -43.22861
      },
      {
        "latitude": -22.91396,
        "longitude": -43.22786
      },
      {
        "latitude": -22.91313,
        "longitude": -43.22718
      },
      {
        "latitude": -22.91312,
        "longitude": -43.227172
      },
      {
        "latitude": -22.91313,
        "longitude": -43.22718
      },
      {
        "latitude": -22.91237,
        "longitude": -43.22655
      },
      {
        "latitude": -22.91225,
        "longitude": -43.22642
      },
      {
        "latitude": -22.91186,
        "longitude": -43.2258
      },
      {
        "latitude": -22.9117,
        "longitude": -43.22559
      },
      {
        "latitude": -22.91148,
        "longitude": -43.22533
      },
      {
        "latitude": -22.91122,
        "longitude": -43.22492
      },
      {
        "latitude": -22.911214,
        "longitude": -43.224911
      },
      {
        "latitude": -22.91109,
        "longitude": -43.22471
      },
      {
        "latitude": -22.91105,
        "longitude": -43.22462
      },
      {
        "latitude": -22.91099,
        "longitude": -43.22434
      },
      {
        "latitude": -22.91087,
        "longitude": -43.22404
      },
      {
        "latitude": -22.9107,
        "longitude": -43.22335
      },
      {
        "latitude": -22.91055,
        "longitude": -43.22253
      },
      {
        "latitude": -22.91048,
        "longitude": -43.22192
      },
      {
        "latitude": -22.91042,
        "longitude": -43.22162
      },
      {
        "latitude": -22.91027,
        "longitude": -43.2211
      },
      {
        "latitude": -22.91025,
        "longitude": -43.22091
      },
      {
        "latitude": -22.91027,
        "longitude": -43.22002
      },
      {
        "latitude": -22.91033,
        "longitude": -43.21959
      },
      {
        "latitude": -22.91051,
        "longitude": -43.21892
      },
      {
        "latitude": -22.91077,
        "longitude": -43.21822
      },
      {
        "latitude": -22.91095,
        "longitude": -43.21758
      },
      {
        "latitude": -22.91173,
        "longitude": -43.21535
      },
      {
        "latitude": -22.91174,
        "longitude": -43.21507
      },
      {
        "latitude": -22.91172,
        "longitude": -43.21498
      },
      {
        "latitude": -22.91167,
        "longitude": -43.21482
      },
      {
        "latitude": -22.9114,
        "longitude": -43.21434
      },
      {
        "latitude": -22.91121,
        "longitude": -43.21399
      },
      {
        "latitude": -22.91111,
        "longitude": -43.21374
      },
      {
        "latitude": -22.91106,
        "longitude": -43.21357
      },
      {
        "latitude": -22.91102,
        "longitude": -43.21327
      },
      {
        "latitude": -22.91094,
        "longitude": -43.21246
      },
      {
        "latitude": -22.91089,
        "longitude": -43.21203
      },
      {
        "latitude": -22.91089,
        "longitude": -43.21183
      },
      {
        "latitude": -22.9112,
        "longitude": -43.21018
      },
      {
        "latitude": -22.91125,
        "longitude": -43.20979
      },
      {
        "latitude": -22.91126,
        "longitude": -43.20945
      },
      {
        "latitude": -22.91123,
        "longitude": -43.20916
      },
      {
        "latitude": -22.91117,
        "longitude": -43.2088
      },
      {
        "latitude": -22.91087,
        "longitude": -43.2078
      },
      {
        "latitude": -22.91056,
        "longitude": -43.20688
      },
      {
        "latitude": -22.91023,
        "longitude": -43.20567
      },
      {
        "latitude": -22.91024,
        "longitude": -43.20567
      },
      {
        "latitude": -22.90971,
        "longitude": -43.20415
      },
      {
        "latitude": -22.90951,
        "longitude": -43.20351
      },
      {
        "latitude": -22.90902,
        "longitude": -43.20208
      },
      {
        "latitude": -22.90855,
        "longitude": -43.20063
      },
      {
        "latitude": -22.90861,
        "longitude": -43.20061
      },
      {
        "latitude": -22.90866,
        "longitude": -43.20053
      },
      {
        "latitude": -22.90899,
        "longitude": -43.20039
      },
      {
        "latitude": -22.909107,
        "longitude": -43.200224
      },
      {
        "latitude": -22.90911,
        "longitude": -43.20022
      },
      {
        "latitude": -22.90919,
        "longitude": -43.20007
      },
      {
        "latitude": -22.90908,
        "longitude": -43.19968
      },
      {
        "latitude": -22.90855,
        "longitude": -43.19798
      },
      {
        "latitude": -22.90856,
        "longitude": -43.19798
      },
      {
        "latitude": -22.9084,
        "longitude": -43.19749
      },
      {
        "latitude": -22.90842,
        "longitude": -43.19731
      },
      {
        "latitude": -22.90845,
        "longitude": -43.19727
      },
      {
        "latitude": -22.90858,
        "longitude": -43.19718
      },
      {
        "latitude": -22.9092,
        "longitude": -43.1969
      },
      {
        "latitude": -22.90977,
        "longitude": -43.19661
      },
      {
        "latitude": -22.91091,
        "longitude": -43.19616
      },
      {
        "latitude": -22.91141,
        "longitude": -43.196
      },
      {
        "latitude": -22.91591,
        "longitude": -43.19431
      },
      {
        "latitude": -22.91634,
        "longitude": -43.19423
      },
      {
        "latitude": -22.91652,
        "longitude": -43.19423
      },
      {
        "latitude": -22.91819,
        "longitude": -43.19454
      },
      {
        "latitude": -22.91869,
        "longitude": -43.1946
      },
      {
        "latitude": -22.91907,
        "longitude": -43.19458
      },
      {
        "latitude": -22.91953,
        "longitude": -43.19447
      },
      {
        "latitude": -22.9199,
        "longitude": -43.19432
      },
      {
        "latitude": -22.9202,
        "longitude": -43.19414
      },
      {
        "latitude": -22.9205,
        "longitude": -43.19391
      },
      {
        "latitude": -22.93026,
        "longitude": -43.18642
      },
      {
        "latitude": -22.93132,
        "longitude": -43.18565
      },
      {
        "latitude": -22.93307,
        "longitude": -43.18481
      },
      {
        "latitude": -22.93334,
        "longitude": -43.18472
      },
      {
        "latitude": -22.93498,
        "longitude": -43.18431
      },
      {
        "latitude": -22.93515,
        "longitude": -43.18428
      },
      {
        "latitude": -22.9358,
        "longitude": -43.18405
      },
      {
        "latitude": -22.93639,
        "longitude": -43.1839
      },
      {
        "latitude": -22.9377,
        "longitude": -43.18358
      },
      {
        "latitude": -22.93792,
        "longitude": -43.1835
      },
      {
        "latitude": -22.93906,
        "longitude": -43.18321
      },
      {
        "latitude": -22.93949,
        "longitude": -43.1831
      },
      {
        "latitude": -22.94018,
        "longitude": -43.18288
      },
      {
        "latitude": -22.94082,
        "longitude": -43.18271
      },
      {
        "latitude": -22.94178,
        "longitude": -43.18234
      },
      {
        "latitude": -22.94192,
        "longitude": -43.18232
      },
      {
        "latitude": -22.94203,
        "longitude": -43.18234
      },
      {
        "latitude": -22.9421,
        "longitude": -43.18237
      },
      {
        "latitude": -22.94238,
        "longitude": -43.18265
      },
      {
        "latitude": -22.94275,
        "longitude": -43.18305
      },
      {
        "latitude": -22.943142,
        "longitude": -43.183325
      },
      {
        "latitude": -22.94315,
        "longitude": -43.18333
      },
      {
        "latitude": -22.94367,
        "longitude": -43.18365
      },
      {
        "latitude": -22.94386,
        "longitude": -43.18373
      },
      {
        "latitude": -22.94444,
        "longitude": -43.18389
      },
      {
        "latitude": -22.94536,
        "longitude": -43.18407
      },
      {
        "latitude": -22.9459,
        "longitude": -43.18418
      },
      {
        "latitude": -22.94608,
        "longitude": -43.1842
      },
      {
        "latitude": -22.94602,
        "longitude": -43.18256
      },
      {
        "latitude": -22.94664,
        "longitude": -43.18259
      },
      {
        "latitude": -22.94694,
        "longitude": -43.18258
      },
      {
        "latitude": -22.94758,
        "longitude": -43.18252
      },
      {
        "latitude": -22.9483,
        "longitude": -43.18235
      },
      {
        "latitude": -22.94855,
        "longitude": -43.18223
      },
      {
        "latitude": -22.95044,
        "longitude": -43.18151
      },
      {
        "latitude": -22.95069,
        "longitude": -43.18136
      },
      {
        "latitude": -22.95086,
        "longitude": -43.18122
      },
      {
        "latitude": -22.95105,
        "longitude": -43.18099
      },
      {
        "latitude": -22.95119,
        "longitude": -43.18089
      },
      {
        "latitude": -22.9513,
        "longitude": -43.18088
      },
      {
        "latitude": -22.95139,
        "longitude": -43.1809
      },
      {
        "latitude": -22.95152,
        "longitude": -43.18097
      },
      {
        "latitude": -22.95208,
        "longitude": -43.18148
      },
      {
        "latitude": -22.95214,
        "longitude": -43.18156
      },
      {
        "latitude": -22.95218,
        "longitude": -43.18167
      },
      {
        "latitude": -22.95221,
        "longitude": -43.18182
      },
      {
        "latitude": -22.95229,
        "longitude": -43.18195
      },
      {
        "latitude": -22.95237,
        "longitude": -43.18203
      },
      {
        "latitude": -22.95243,
        "longitude": -43.18205
      },
      {
        "latitude": -22.95265,
        "longitude": -43.18204
      },
      {
        "latitude": -22.95362,
        "longitude": -43.18151
      },
      {
        "latitude": -22.95439,
        "longitude": -43.18115
      },
      {
        "latitude": -22.95447,
        "longitude": -43.18108
      },
      {
        "latitude": -22.95488,
        "longitude": -43.18087
      },
      {
        "latitude": -22.95585,
        "longitude": -43.18036
      },
      {
        "latitude": -22.95586,
        "longitude": -43.18027
      },
      {
        "latitude": -22.95579,
        "longitude": -43.17993
      },
      {
        "latitude": -22.95569,
        "longitude": -43.17849
      },
      {
        "latitude": -22.95569,
        "longitude": -43.17835
      },
      {
        "latitude": -22.95573,
        "longitude": -43.17818
      },
      {
        "latitude": -22.95583,
        "longitude": -43.178
      },
      {
        "latitude": -22.95609,
        "longitude": -43.17779
      },
      {
        "latitude": -22.95625,
        "longitude": -43.17774
      },
      {
        "latitude": -22.95708,
        "longitude": -43.17762
      },
      {
        "latitude": -22.95789,
        "longitude": -43.17745
      },
      {
        "latitude": -22.95828,
        "longitude": -43.17734
      },
      {
        "latitude": -22.95882,
        "longitude": -43.17706
      },
      {
        "latitude": -22.96091,
        "longitude": -43.1759
      },
      {
        "latitude": -22.96145,
        "longitude": -43.17561
      },
      {
        "latitude": -22.96182,
        "longitude": -43.17569
      },
      {
        "latitude": -22.96215,
        "longitude": -43.17584
      },
      {
        "latitude": -22.96227,
        "longitude": -43.17595
      },
      {
        "latitude": -22.96279,
        "longitude": -43.17677
      },
      {
        "latitude": -22.96377,
        "longitude": -43.17828
      },
      {
        "latitude": -22.96544,
        "longitude": -43.18085
      },
      {
        "latitude": -22.96624,
        "longitude": -43.18205
      },
      {
        "latitude": -22.96756,
        "longitude": -43.18407
      },
      {
        "latitude": -22.96833,
        "longitude": -43.18525
      },
      {
        "latitude": -22.9693,
        "longitude": -43.1868
      },
      {
        "latitude": -22.96959,
        "longitude": -43.18723
      },
      {
        "latitude": -22.9703,
        "longitude": -43.18829
      },
      {
        "latitude": -22.97165,
        "longitude": -43.18962
      },
      {
        "latitude": -22.97292,
        "longitude": -43.19083
      },
      {
        "latitude": -22.97366,
        "longitude": -43.19122
      },
      {
        "latitude": -22.97571,
        "longitude": -43.19229
      },
      {
        "latitude": -22.97611,
        "longitude": -43.19241
      },
      {
        "latitude": -22.97794,
        "longitude": -43.19291
      },
      {
        "latitude": -22.97854,
        "longitude": -43.19293
      },
      {
        "latitude": -22.97942,
        "longitude": -43.19286
      },
      {
        "latitude": -22.98025,
        "longitude": -43.19277
      },
      {
        "latitude": -22.98096,
        "longitude": -43.19262
      },
      {
        "latitude": -22.98178,
        "longitude": -43.19238
      },
      {
        "latitude": -22.98389,
        "longitude": -43.19175
      },
      {
        "latitude": -22.986692,
        "longitude": -43.190892
      }
    ]
  },
  "474": {
    "lineNumber": "474",
    "name": "Linha 474",
    "color": "#7C3AED",
    "coordinates": [
      {
        "latitude": -22.89423,
        "longitude": -43.26327
      },
      {
        "latitude": -22.89422,
        "longitude": -43.26335
      },
      {
        "latitude": -22.89425,
        "longitude": -43.2634
      },
      {
        "latitude": -22.8942,
        "longitude": -43.26348
      },
      {
        "latitude": -22.89485,
        "longitude": -43.26376
      },
      {
        "latitude": -22.89529,
        "longitude": -43.2626
      },
      {
        "latitude": -22.89523,
        "longitude": -43.26257
      },
      {
        "latitude": -22.8951,
        "longitude": -43.26243
      },
      {
        "latitude": -22.89501,
        "longitude": -43.26227
      },
      {
        "latitude": -22.89469,
        "longitude": -43.26161
      },
      {
        "latitude": -22.89436,
        "longitude": -43.26105
      },
      {
        "latitude": -22.89388,
        "longitude": -43.26045
      },
      {
        "latitude": -22.89374,
        "longitude": -43.26028
      },
      {
        "latitude": -22.89362,
        "longitude": -43.26007
      },
      {
        "latitude": -22.89354,
        "longitude": -43.25987
      },
      {
        "latitude": -22.89352,
        "longitude": -43.25975
      },
      {
        "latitude": -22.89357,
        "longitude": -43.25948
      },
      {
        "latitude": -22.89373,
        "longitude": -43.2587
      },
      {
        "latitude": -22.89381,
        "longitude": -43.25843
      },
      {
        "latitude": -22.89417,
        "longitude": -43.25762
      },
      {
        "latitude": -22.89429,
        "longitude": -43.25738
      },
      {
        "latitude": -22.89439,
        "longitude": -43.25718
      },
      {
        "latitude": -22.89449,
        "longitude": -43.25692
      },
      {
        "latitude": -22.89618,
        "longitude": -43.25684
      },
      {
        "latitude": -22.89646,
        "longitude": -43.25685
      },
      {
        "latitude": -22.89651,
        "longitude": -43.25686
      },
      {
        "latitude": -22.89662,
        "longitude": -43.25696
      },
      {
        "latitude": -22.89667,
        "longitude": -43.25698
      },
      {
        "latitude": -22.89677,
        "longitude": -43.25698
      },
      {
        "latitude": -22.89712,
        "longitude": -43.25677
      },
      {
        "latitude": -22.89837,
        "longitude": -43.25665
      },
      {
        "latitude": -22.89869,
        "longitude": -43.25663
      },
      {
        "latitude": -22.89935,
        "longitude": -43.25655
      },
      {
        "latitude": -22.8994,
        "longitude": -43.25662
      },
      {
        "latitude": -22.89942,
        "longitude": -43.25671
      },
      {
        "latitude": -22.89956,
        "longitude": -43.25834
      },
      {
        "latitude": -22.90149,
        "longitude": -43.25817
      },
      {
        "latitude": -22.90136,
        "longitude": -43.25641
      },
      {
        "latitude": -22.90094,
        "longitude": -43.25108
      },
      {
        "latitude": -22.90087,
        "longitude": -43.25012
      },
      {
        "latitude": -22.90086,
        "longitude": -43.24965
      },
      {
        "latitude": -22.9009,
        "longitude": -43.24899
      },
      {
        "latitude": -22.90094,
        "longitude": -43.2486
      },
      {
        "latitude": -22.90094,
        "longitude": -43.24838
      },
      {
        "latitude": -22.90089,
        "longitude": -43.24811
      },
      {
        "latitude": -22.9005,
        "longitude": -43.24608
      },
      {
        "latitude": -22.90038,
        "longitude": -43.24562
      },
      {
        "latitude": -22.90022,
        "longitude": -43.24505
      },
      {
        "latitude": -22.89998,
        "longitude": -43.24425
      },
      {
        "latitude": -22.89936,
        "longitude": -43.2442
      },
      {
        "latitude": -22.89906,
        "longitude": -43.24387
      },
      {
        "latitude": -22.89882,
        "longitude": -43.2437
      },
      {
        "latitude": -22.89871,
        "longitude": -43.24366
      },
      {
        "latitude": -22.89864,
        "longitude": -43.24362
      },
      {
        "latitude": -22.89727,
        "longitude": -43.24259
      },
      {
        "latitude": -22.89694,
        "longitude": -43.24232
      },
      {
        "latitude": -22.89603,
        "longitude": -43.24135
      },
      {
        "latitude": -22.89596,
        "longitude": -43.24117
      },
      {
        "latitude": -22.89593,
        "longitude": -43.24104
      },
      {
        "latitude": -22.89593,
        "longitude": -43.24078
      },
      {
        "latitude": -22.89604,
        "longitude": -43.24057
      },
      {
        "latitude": -22.89624,
        "longitude": -43.24019
      },
      {
        "latitude": -22.89789,
        "longitude": -43.24043
      },
      {
        "latitude": -22.89884,
        "longitude": -43.24057
      },
      {
        "latitude": -22.89907,
        "longitude": -43.24054
      },
      {
        "latitude": -22.89913,
        "longitude": -43.2405
      },
      {
        "latitude": -22.89918,
        "longitude": -43.24043
      },
      {
        "latitude": -22.8992,
        "longitude": -43.24033
      },
      {
        "latitude": -22.8992,
        "longitude": -43.24019
      },
      {
        "latitude": -22.89918,
        "longitude": -43.24012
      },
      {
        "latitude": -22.89894,
        "longitude": -43.23949
      },
      {
        "latitude": -22.89881,
        "longitude": -43.23921
      },
      {
        "latitude": -22.89868,
        "longitude": -43.23877
      },
      {
        "latitude": -22.89869,
        "longitude": -43.23856
      },
      {
        "latitude": -22.89878,
        "longitude": -43.23754
      },
      {
        "latitude": -22.89896,
        "longitude": -43.23661
      },
      {
        "latitude": -22.89906,
        "longitude": -43.23608
      },
      {
        "latitude": -22.89919,
        "longitude": -43.23575
      },
      {
        "latitude": -22.89935,
        "longitude": -43.23561
      },
      {
        "latitude": -22.89975,
        "longitude": -43.2352
      },
      {
        "latitude": -22.89999,
        "longitude": -43.23493
      },
      {
        "latitude": -22.90005,
        "longitude": -43.23477
      },
      {
        "latitude": -22.9001,
        "longitude": -43.23456
      },
      {
        "latitude": -22.90044,
        "longitude": -43.23307
      },
      {
        "latitude": -22.90055,
        "longitude": -43.23228
      },
      {
        "latitude": -22.90059,
        "longitude": -43.23202
      },
      {
        "latitude": -22.90056,
        "longitude": -43.23173
      },
      {
        "latitude": -22.90051,
        "longitude": -43.23148
      },
      {
        "latitude": -22.90014,
        "longitude": -43.23006
      },
      {
        "latitude": -22.89974,
        "longitude": -43.22842
      },
      {
        "latitude": -22.89962,
        "longitude": -43.22792
      },
      {
        "latitude": -22.89962,
        "longitude": -43.22745
      },
      {
        "latitude": -22.89964,
        "longitude": -43.22732
      },
      {
        "latitude": -22.9002,
        "longitude": -43.2256
      },
      {
        "latitude": -22.90044,
        "longitude": -43.22513
      },
      {
        "latitude": -22.90048,
        "longitude": -43.22502
      },
      {
        "latitude": -22.90053,
        "longitude": -43.22468
      },
      {
        "latitude": -22.90057,
        "longitude": -43.22463
      },
      {
        "latitude": -22.90122,
        "longitude": -43.22424
      },
      {
        "latitude": -22.9009,
        "longitude": -43.22392
      },
      {
        "latitude": -22.89953,
        "longitude": -43.22253
      },
      {
        "latitude": -22.89938,
        "longitude": -43.22224
      },
      {
        "latitude": -22.89902,
        "longitude": -43.22072
      },
      {
        "latitude": -22.8989,
        "longitude": -43.22031
      },
      {
        "latitude": -22.89875,
        "longitude": -43.21989
      },
      {
        "latitude": -22.89845,
        "longitude": -43.21929
      },
      {
        "latitude": -22.89836,
        "longitude": -43.21911
      },
      {
        "latitude": -22.89829,
        "longitude": -43.21899
      },
      {
        "latitude": -22.89831,
        "longitude": -43.21894
      },
      {
        "latitude": -22.89837,
        "longitude": -43.21887
      },
      {
        "latitude": -22.90058,
        "longitude": -43.2174
      },
      {
        "latitude": -22.90125,
        "longitude": -43.21697
      },
      {
        "latitude": -22.90245,
        "longitude": -43.21799
      },
      {
        "latitude": -22.90255,
        "longitude": -43.21807
      },
      {
        "latitude": -22.90306,
        "longitude": -43.21843
      },
      {
        "latitude": -22.90335,
        "longitude": -43.21854
      },
      {
        "latitude": -22.90365,
        "longitude": -43.21862
      },
      {
        "latitude": -22.90382,
        "longitude": -43.21864
      },
      {
        "latitude": -22.9039,
        "longitude": -43.21862
      },
      {
        "latitude": -22.90454,
        "longitude": -43.21834
      },
      {
        "latitude": -22.90456,
        "longitude": -43.2184
      },
      {
        "latitude": -22.90464,
        "longitude": -43.21849
      },
      {
        "latitude": -22.90475,
        "longitude": -43.21854
      },
      {
        "latitude": -22.90481,
        "longitude": -43.21854
      },
      {
        "latitude": -22.90492,
        "longitude": -43.2185
      },
      {
        "latitude": -22.90496,
        "longitude": -43.21846
      },
      {
        "latitude": -22.90502,
        "longitude": -43.21835
      },
      {
        "latitude": -22.90503,
        "longitude": -43.21823
      },
      {
        "latitude": -22.905,
        "longitude": -43.21814
      },
      {
        "latitude": -22.90495,
        "longitude": -43.21806
      },
      {
        "latitude": -22.90487,
        "longitude": -43.21801
      },
      {
        "latitude": -22.90479,
        "longitude": -43.21799
      },
      {
        "latitude": -22.90403,
        "longitude": -43.21615
      },
      {
        "latitude": -22.90337,
        "longitude": -43.21451
      },
      {
        "latitude": -22.90199,
        "longitude": -43.211
      },
      {
        "latitude": -22.90187,
        "longitude": -43.21066
      },
      {
        "latitude": -22.90187,
        "longitude": -43.21056
      },
      {
        "latitude": -22.90191,
        "longitude": -43.21047
      },
      {
        "latitude": -22.90315,
        "longitude": -43.21039
      },
      {
        "latitude": -22.90341,
        "longitude": -43.2103
      },
      {
        "latitude": -22.9039,
        "longitude": -43.21018
      },
      {
        "latitude": -22.9061,
        "longitude": -43.21003
      },
      {
        "latitude": -22.90813,
        "longitude": -43.20991
      },
      {
        "latitude": -22.90928,
        "longitude": -43.20984
      },
      {
        "latitude": -22.9096,
        "longitude": -43.20979
      },
      {
        "latitude": -22.91004,
        "longitude": -43.20966
      },
      {
        "latitude": -22.91021,
        "longitude": -43.20954
      },
      {
        "latitude": -22.91039,
        "longitude": -43.20938
      },
      {
        "latitude": -22.91047,
        "longitude": -43.20928
      },
      {
        "latitude": -22.91053,
        "longitude": -43.20915
      },
      {
        "latitude": -22.91065,
        "longitude": -43.20887
      },
      {
        "latitude": -22.91069,
        "longitude": -43.20873
      },
      {
        "latitude": -22.91075,
        "longitude": -43.20839
      },
      {
        "latitude": -22.91075,
        "longitude": -43.20817
      },
      {
        "latitude": -22.91074,
        "longitude": -43.20797
      },
      {
        "latitude": -22.9107,
        "longitude": -43.20778
      },
      {
        "latitude": -22.91003,
        "longitude": -43.20564
      },
      {
        "latitude": -22.91003,
        "longitude": -43.20565
      },
      {
        "latitude": -22.90933,
        "longitude": -43.20345
      },
      {
        "latitude": -22.90923,
        "longitude": -43.2027
      },
      {
        "latitude": -22.9091,
        "longitude": -43.2023
      },
      {
        "latitude": -22.909099,
        "longitude": -43.202297
      },
      {
        "latitude": -22.90855,
        "longitude": -43.20063
      },
      {
        "latitude": -22.90861,
        "longitude": -43.20061
      },
      {
        "latitude": -22.9087,
        "longitude": -43.20052
      },
      {
        "latitude": -22.909723,
        "longitude": -43.200143
      },
      {
        "latitude": -22.90973,
        "longitude": -43.20014
      },
      {
        "latitude": -22.91142,
        "longitude": -43.19953
      },
      {
        "latitude": -22.911421,
        "longitude": -43.19953
      },
      {
        "latitude": -22.91169,
        "longitude": -43.19943
      },
      {
        "latitude": -22.913761,
        "longitude": -43.19948
      },
      {
        "latitude": -22.91377,
        "longitude": -43.19948
      },
      {
        "latitude": -22.91418,
        "longitude": -43.19949
      },
      {
        "latitude": -22.91434,
        "longitude": -43.19945
      },
      {
        "latitude": -22.91452,
        "longitude": -43.19848
      },
      {
        "latitude": -22.91452,
        "longitude": -43.19828
      },
      {
        "latitude": -22.91447,
        "longitude": -43.19787
      },
      {
        "latitude": -22.91424,
        "longitude": -43.19672
      },
      {
        "latitude": -22.91418,
        "longitude": -43.19634
      },
      {
        "latitude": -22.91418,
        "longitude": -43.19635
      },
      {
        "latitude": -22.91407,
        "longitude": -43.1957
      },
      {
        "latitude": -22.91405,
        "longitude": -43.19556
      },
      {
        "latitude": -22.91417,
        "longitude": -43.19529
      },
      {
        "latitude": -22.91421,
        "longitude": -43.19524
      },
      {
        "latitude": -22.91435,
        "longitude": -43.19517
      },
      {
        "latitude": -22.91601,
        "longitude": -43.1945
      },
      {
        "latitude": -22.916169,
        "longitude": -43.194463
      },
      {
        "latitude": -22.91618,
        "longitude": -43.19446
      },
      {
        "latitude": -22.91654,
        "longitude": -43.19442
      },
      {
        "latitude": -22.91683,
        "longitude": -43.19445
      },
      {
        "latitude": -22.91819,
        "longitude": -43.19462
      },
      {
        "latitude": -22.91842,
        "longitude": -43.19463
      },
      {
        "latitude": -22.91869,
        "longitude": -43.1946
      },
      {
        "latitude": -22.91907,
        "longitude": -43.19458
      },
      {
        "latitude": -22.91953,
        "longitude": -43.19447
      },
      {
        "latitude": -22.9199,
        "longitude": -43.19432
      },
      {
        "latitude": -22.9202,
        "longitude": -43.19414
      },
      {
        "latitude": -22.93026,
        "longitude": -43.18642
      },
      {
        "latitude": -22.93132,
        "longitude": -43.18565
      },
      {
        "latitude": -22.93307,
        "longitude": -43.18481
      },
      {
        "latitude": -22.93334,
        "longitude": -43.18472
      },
      {
        "latitude": -22.93498,
        "longitude": -43.18431
      },
      {
        "latitude": -22.93515,
        "longitude": -43.18428
      },
      {
        "latitude": -22.9358,
        "longitude": -43.18405
      },
      {
        "latitude": -22.93639,
        "longitude": -43.1839
      },
      {
        "latitude": -22.9377,
        "longitude": -43.18358
      },
      {
        "latitude": -22.93792,
        "longitude": -43.1835
      },
      {
        "latitude": -22.93906,
        "longitude": -43.18321
      },
      {
        "latitude": -22.93949,
        "longitude": -43.1831
      },
      {
        "latitude": -22.94018,
        "longitude": -43.18288
      },
      {
        "latitude": -22.94082,
        "longitude": -43.18271
      },
      {
        "latitude": -22.94178,
        "longitude": -43.18234
      },
      {
        "latitude": -22.94192,
        "longitude": -43.18232
      },
      {
        "latitude": -22.94203,
        "longitude": -43.18234
      },
      {
        "latitude": -22.9421,
        "longitude": -43.18237
      },
      {
        "latitude": -22.94238,
        "longitude": -43.18265
      },
      {
        "latitude": -22.94275,
        "longitude": -43.18305
      },
      {
        "latitude": -22.943109,
        "longitude": -43.183309
      },
      {
        "latitude": -22.94311,
        "longitude": -43.18331
      },
      {
        "latitude": -22.94367,
        "longitude": -43.18365
      },
      {
        "latitude": -22.94386,
        "longitude": -43.18373
      },
      {
        "latitude": -22.94444,
        "longitude": -43.18389
      },
      {
        "latitude": -22.94536,
        "longitude": -43.18407
      },
      {
        "latitude": -22.9459,
        "longitude": -43.18418
      },
      {
        "latitude": -22.94608,
        "longitude": -43.1842
      },
      {
        "latitude": -22.94602,
        "longitude": -43.18256
      },
      {
        "latitude": -22.94666,
        "longitude": -43.18259
      },
      {
        "latitude": -22.94694,
        "longitude": -43.18258
      },
      {
        "latitude": -22.94737,
        "longitude": -43.18254
      },
      {
        "latitude": -22.94769,
        "longitude": -43.1825
      },
      {
        "latitude": -22.9483,
        "longitude": -43.18235
      },
      {
        "latitude": -22.94855,
        "longitude": -43.18223
      },
      {
        "latitude": -22.95044,
        "longitude": -43.18151
      },
      {
        "latitude": -22.95069,
        "longitude": -43.18136
      },
      {
        "latitude": -22.95086,
        "longitude": -43.18122
      },
      {
        "latitude": -22.95105,
        "longitude": -43.18099
      },
      {
        "latitude": -22.95119,
        "longitude": -43.18089
      },
      {
        "latitude": -22.9513,
        "longitude": -43.18088
      },
      {
        "latitude": -22.95139,
        "longitude": -43.1809
      },
      {
        "latitude": -22.95152,
        "longitude": -43.18097
      },
      {
        "latitude": -22.95208,
        "longitude": -43.18148
      },
      {
        "latitude": -22.95214,
        "longitude": -43.18156
      },
      {
        "latitude": -22.95218,
        "longitude": -43.18167
      },
      {
        "latitude": -22.95221,
        "longitude": -43.18182
      },
      {
        "latitude": -22.95229,
        "longitude": -43.18195
      },
      {
        "latitude": -22.95237,
        "longitude": -43.18203
      },
      {
        "latitude": -22.95243,
        "longitude": -43.18205
      },
      {
        "latitude": -22.95265,
        "longitude": -43.18204
      },
      {
        "latitude": -22.95362,
        "longitude": -43.18151
      },
      {
        "latitude": -22.95439,
        "longitude": -43.18115
      },
      {
        "latitude": -22.95447,
        "longitude": -43.18108
      },
      {
        "latitude": -22.95488,
        "longitude": -43.18087
      },
      {
        "latitude": -22.95585,
        "longitude": -43.18036
      },
      {
        "latitude": -22.95586,
        "longitude": -43.18027
      },
      {
        "latitude": -22.95579,
        "longitude": -43.17993
      },
      {
        "latitude": -22.95569,
        "longitude": -43.17849
      },
      {
        "latitude": -22.95569,
        "longitude": -43.17835
      },
      {
        "latitude": -22.95573,
        "longitude": -43.17818
      },
      {
        "latitude": -22.95583,
        "longitude": -43.178
      },
      {
        "latitude": -22.95609,
        "longitude": -43.17779
      },
      {
        "latitude": -22.95625,
        "longitude": -43.17774
      },
      {
        "latitude": -22.95708,
        "longitude": -43.17762
      },
      {
        "latitude": -22.95789,
        "longitude": -43.17745
      },
      {
        "latitude": -22.95828,
        "longitude": -43.17734
      },
      {
        "latitude": -22.95882,
        "longitude": -43.17706
      },
      {
        "latitude": -22.96091,
        "longitude": -43.1759
      },
      {
        "latitude": -22.96145,
        "longitude": -43.17561
      },
      {
        "latitude": -22.96182,
        "longitude": -43.17569
      },
      {
        "latitude": -22.96215,
        "longitude": -43.17584
      },
      {
        "latitude": -22.96227,
        "longitude": -43.17595
      },
      {
        "latitude": -22.96279,
        "longitude": -43.17677
      },
      {
        "latitude": -22.96377,
        "longitude": -43.17828
      },
      {
        "latitude": -22.96526,
        "longitude": -43.18057
      },
      {
        "latitude": -22.96696,
        "longitude": -43.18315
      },
      {
        "latitude": -22.96833,
        "longitude": -43.18525
      },
      {
        "latitude": -22.96882,
        "longitude": -43.18604
      },
      {
        "latitude": -22.9693,
        "longitude": -43.1868
      },
      {
        "latitude": -22.96995,
        "longitude": -43.18777
      },
      {
        "latitude": -22.9703,
        "longitude": -43.18829
      },
      {
        "latitude": -22.97255,
        "longitude": -43.19048
      },
      {
        "latitude": -22.97292,
        "longitude": -43.19083
      },
      {
        "latitude": -22.97535,
        "longitude": -43.1921
      },
      {
        "latitude": -22.97571,
        "longitude": -43.19229
      },
      {
        "latitude": -22.97705,
        "longitude": -43.19267
      },
      {
        "latitude": -22.97794,
        "longitude": -43.19291
      },
      {
        "latitude": -22.97854,
        "longitude": -43.19293
      },
      {
        "latitude": -22.97942,
        "longitude": -43.19286
      },
      {
        "latitude": -22.98025,
        "longitude": -43.19277
      },
      {
        "latitude": -22.98096,
        "longitude": -43.19262
      },
      {
        "latitude": -22.98294,
        "longitude": -43.19203
      },
      {
        "latitude": -22.98509,
        "longitude": -43.19139
      },
      {
        "latitude": -22.98694,
        "longitude": -43.19082
      },
      {
        "latitude": -22.98682,
        "longitude": -43.19034
      },
      {
        "latitude": -22.986818,
        "longitude": -43.190332
      },
      {
        "latitude": -22.98682,
        "longitude": -43.19034
      },
      {
        "latitude": -22.98668,
        "longitude": -43.18979
      },
      {
        "latitude": -22.98644,
        "longitude": -43.18986
      }
    ]
  },
  "483": {
    "lineNumber": "483",
    "name": "Linha 483",
    "color": "#EF4444",
    "coordinates": [
      {
        "latitude": -22.83692,
        "longitude": -43.28438
      },
      {
        "latitude": -22.837,
        "longitude": -43.28441
      },
      {
        "latitude": -22.83706,
        "longitude": -43.28439
      },
      {
        "latitude": -22.83712,
        "longitude": -43.28432
      },
      {
        "latitude": -22.83712,
        "longitude": -43.28424
      },
      {
        "latitude": -22.83709,
        "longitude": -43.28417
      },
      {
        "latitude": -22.83615,
        "longitude": -43.28322
      },
      {
        "latitude": -22.83616,
        "longitude": -43.28314
      },
      {
        "latitude": -22.8369,
        "longitude": -43.28251
      },
      {
        "latitude": -22.83718,
        "longitude": -43.28227
      },
      {
        "latitude": -22.83671,
        "longitude": -43.28184
      },
      {
        "latitude": -22.83753,
        "longitude": -43.28111
      },
      {
        "latitude": -22.83858,
        "longitude": -43.28026
      },
      {
        "latitude": -22.83892,
        "longitude": -43.28
      },
      {
        "latitude": -22.83958,
        "longitude": -43.2795
      },
      {
        "latitude": -22.83968,
        "longitude": -43.27938
      },
      {
        "latitude": -22.83998,
        "longitude": -43.27846
      },
      {
        "latitude": -22.8402,
        "longitude": -43.27773
      },
      {
        "latitude": -22.84081,
        "longitude": -43.27569
      },
      {
        "latitude": -22.84092,
        "longitude": -43.27491
      },
      {
        "latitude": -22.84112,
        "longitude": -43.27438
      },
      {
        "latitude": -22.8418,
        "longitude": -43.27271
      },
      {
        "latitude": -22.84214,
        "longitude": -43.27205
      },
      {
        "latitude": -22.84225,
        "longitude": -43.27179
      },
      {
        "latitude": -22.84231,
        "longitude": -43.27154
      },
      {
        "latitude": -22.84234,
        "longitude": -43.2712
      },
      {
        "latitude": -22.84235,
        "longitude": -43.27093
      },
      {
        "latitude": -22.84233,
        "longitude": -43.27081
      },
      {
        "latitude": -22.84221,
        "longitude": -43.27031
      },
      {
        "latitude": -22.84216,
        "longitude": -43.26996
      },
      {
        "latitude": -22.84217,
        "longitude": -43.26977
      },
      {
        "latitude": -22.84221,
        "longitude": -43.26956
      },
      {
        "latitude": -22.84233,
        "longitude": -43.26933
      },
      {
        "latitude": -22.84256,
        "longitude": -43.26896
      },
      {
        "latitude": -22.84264,
        "longitude": -43.26886
      },
      {
        "latitude": -22.8428,
        "longitude": -43.26871
      },
      {
        "latitude": -22.843,
        "longitude": -43.26862
      },
      {
        "latitude": -22.84325,
        "longitude": -43.26855
      },
      {
        "latitude": -22.84381,
        "longitude": -43.26848
      },
      {
        "latitude": -22.84416,
        "longitude": -43.26846
      },
      {
        "latitude": -22.84425,
        "longitude": -43.26842
      },
      {
        "latitude": -22.84459,
        "longitude": -43.26814
      },
      {
        "latitude": -22.84537,
        "longitude": -43.26752
      },
      {
        "latitude": -22.8475,
        "longitude": -43.26585
      },
      {
        "latitude": -22.85003,
        "longitude": -43.26385
      },
      {
        "latitude": -22.85454,
        "longitude": -43.26029
      },
      {
        "latitude": -22.85475,
        "longitude": -43.25991
      },
      {
        "latitude": -22.85496,
        "longitude": -43.25959
      },
      {
        "latitude": -22.85508,
        "longitude": -43.25947
      },
      {
        "latitude": -22.8556,
        "longitude": -43.25904
      },
      {
        "latitude": -22.8562,
        "longitude": -43.25857
      },
      {
        "latitude": -22.85674,
        "longitude": -43.2581
      },
      {
        "latitude": -22.85714,
        "longitude": -43.25775
      },
      {
        "latitude": -22.85726,
        "longitude": -43.25762
      },
      {
        "latitude": -22.85764,
        "longitude": -43.25728
      },
      {
        "latitude": -22.85831,
        "longitude": -43.25662
      },
      {
        "latitude": -22.85846,
        "longitude": -43.25654
      },
      {
        "latitude": -22.85932,
        "longitude": -43.25627
      },
      {
        "latitude": -22.85973,
        "longitude": -43.25615
      },
      {
        "latitude": -22.86016,
        "longitude": -43.25589
      },
      {
        "latitude": -22.86059,
        "longitude": -43.25559
      },
      {
        "latitude": -22.86075,
        "longitude": -43.25568
      },
      {
        "latitude": -22.86114,
        "longitude": -43.25596
      },
      {
        "latitude": -22.86196,
        "longitude": -43.25655
      },
      {
        "latitude": -22.86208,
        "longitude": -43.25671
      },
      {
        "latitude": -22.86211,
        "longitude": -43.25684
      },
      {
        "latitude": -22.86217,
        "longitude": -43.2569
      },
      {
        "latitude": -22.86224,
        "longitude": -43.25694
      },
      {
        "latitude": -22.86249,
        "longitude": -43.25685
      },
      {
        "latitude": -22.86374,
        "longitude": -43.25642
      },
      {
        "latitude": -22.86565,
        "longitude": -43.25582
      },
      {
        "latitude": -22.86594,
        "longitude": -43.25573
      },
      {
        "latitude": -22.86802,
        "longitude": -43.25497
      },
      {
        "latitude": -22.86994,
        "longitude": -43.25433
      },
      {
        "latitude": -22.87148,
        "longitude": -43.25382
      },
      {
        "latitude": -22.87152,
        "longitude": -43.25374
      },
      {
        "latitude": -22.87152,
        "longitude": -43.25368
      },
      {
        "latitude": -22.87149,
        "longitude": -43.25365
      },
      {
        "latitude": -22.87143,
        "longitude": -43.25361
      },
      {
        "latitude": -22.87059,
        "longitude": -43.25394
      },
      {
        "latitude": -22.86931,
        "longitude": -43.25438
      },
      {
        "latitude": -22.86849,
        "longitude": -43.25466
      },
      {
        "latitude": -22.86799,
        "longitude": -43.25478
      },
      {
        "latitude": -22.86716,
        "longitude": -43.25504
      },
      {
        "latitude": -22.86704,
        "longitude": -43.25496
      },
      {
        "latitude": -22.867,
        "longitude": -43.25489
      },
      {
        "latitude": -22.86678,
        "longitude": -43.25413
      },
      {
        "latitude": -22.86616,
        "longitude": -43.252
      },
      {
        "latitude": -22.86528,
        "longitude": -43.24897
      },
      {
        "latitude": -22.86503,
        "longitude": -43.24809
      },
      {
        "latitude": -22.86827,
        "longitude": -43.24759
      },
      {
        "latitude": -22.86852,
        "longitude": -43.24752
      },
      {
        "latitude": -22.86946,
        "longitude": -43.2473
      },
      {
        "latitude": -22.87023,
        "longitude": -43.24695
      },
      {
        "latitude": -22.87076,
        "longitude": -43.24671
      },
      {
        "latitude": -22.87125,
        "longitude": -43.24639
      },
      {
        "latitude": -22.87244,
        "longitude": -43.24551
      },
      {
        "latitude": -22.8753,
        "longitude": -43.24329
      },
      {
        "latitude": -22.87571,
        "longitude": -43.24298
      },
      {
        "latitude": -22.87681,
        "longitude": -43.24212
      },
      {
        "latitude": -22.8776,
        "longitude": -43.24156
      },
      {
        "latitude": -22.87776,
        "longitude": -43.24153
      },
      {
        "latitude": -22.87786,
        "longitude": -43.24149
      },
      {
        "latitude": -22.87795,
        "longitude": -43.24143
      },
      {
        "latitude": -22.87885,
        "longitude": -43.24082
      },
      {
        "latitude": -22.87893,
        "longitude": -43.24073
      },
      {
        "latitude": -22.87902,
        "longitude": -43.24055
      },
      {
        "latitude": -22.88129,
        "longitude": -43.239
      },
      {
        "latitude": -22.88194,
        "longitude": -43.23849
      },
      {
        "latitude": -22.88282,
        "longitude": -43.23773
      },
      {
        "latitude": -22.88454,
        "longitude": -43.23612
      },
      {
        "latitude": -22.8856,
        "longitude": -43.23511
      },
      {
        "latitude": -22.88589,
        "longitude": -43.23486
      },
      {
        "latitude": -22.88661,
        "longitude": -43.23416
      },
      {
        "latitude": -22.88677,
        "longitude": -43.23393
      },
      {
        "latitude": -22.88689,
        "longitude": -43.2337
      },
      {
        "latitude": -22.88716,
        "longitude": -43.23315
      },
      {
        "latitude": -22.88733,
        "longitude": -43.23231
      },
      {
        "latitude": -22.88737,
        "longitude": -43.23187
      },
      {
        "latitude": -22.88736,
        "longitude": -43.23144
      },
      {
        "latitude": -22.8873,
        "longitude": -43.2311
      },
      {
        "latitude": -22.88716,
        "longitude": -43.23066
      },
      {
        "latitude": -22.88701,
        "longitude": -43.23031
      },
      {
        "latitude": -22.88681,
        "longitude": -43.22996
      },
      {
        "latitude": -22.88589,
        "longitude": -43.22883
      },
      {
        "latitude": -22.88589,
        "longitude": -43.22884
      },
      {
        "latitude": -22.88543,
        "longitude": -43.22828
      },
      {
        "latitude": -22.88533,
        "longitude": -43.2281
      },
      {
        "latitude": -22.88519,
        "longitude": -43.22773
      },
      {
        "latitude": -22.88511,
        "longitude": -43.22731
      },
      {
        "latitude": -22.88514,
        "longitude": -43.22697
      },
      {
        "latitude": -22.88521,
        "longitude": -43.2267
      },
      {
        "latitude": -22.88534,
        "longitude": -43.22643
      },
      {
        "latitude": -22.88541,
        "longitude": -43.22633
      },
      {
        "latitude": -22.88576,
        "longitude": -43.22596
      },
      {
        "latitude": -22.88654,
        "longitude": -43.22519
      },
      {
        "latitude": -22.8874,
        "longitude": -43.2243
      },
      {
        "latitude": -22.88769,
        "longitude": -43.22396
      },
      {
        "latitude": -22.88836,
        "longitude": -43.22325
      },
      {
        "latitude": -22.88847,
        "longitude": -43.22306
      },
      {
        "latitude": -22.88854,
        "longitude": -43.22291
      },
      {
        "latitude": -22.88875,
        "longitude": -43.22262
      },
      {
        "latitude": -22.88883,
        "longitude": -43.22249
      },
      {
        "latitude": -22.88892,
        "longitude": -43.22222
      },
      {
        "latitude": -22.88894,
        "longitude": -43.22205
      },
      {
        "latitude": -22.889,
        "longitude": -43.22195
      },
      {
        "latitude": -22.88905,
        "longitude": -43.22169
      },
      {
        "latitude": -22.88912,
        "longitude": -43.22084
      },
      {
        "latitude": -22.88922,
        "longitude": -43.21884
      },
      {
        "latitude": -22.88928,
        "longitude": -43.21831
      },
      {
        "latitude": -22.88931,
        "longitude": -43.21819
      },
      {
        "latitude": -22.88939,
        "longitude": -43.218
      },
      {
        "latitude": -22.88973,
        "longitude": -43.21749
      },
      {
        "latitude": -22.89001,
        "longitude": -43.2172
      },
      {
        "latitude": -22.89119,
        "longitude": -43.21661
      },
      {
        "latitude": -22.89234,
        "longitude": -43.21612
      },
      {
        "latitude": -22.894,
        "longitude": -43.21533
      },
      {
        "latitude": -22.89536,
        "longitude": -43.21471
      },
      {
        "latitude": -22.89561,
        "longitude": -43.21457
      },
      {
        "latitude": -22.89574,
        "longitude": -43.21448
      },
      {
        "latitude": -22.8961,
        "longitude": -43.2141
      },
      {
        "latitude": -22.896329,
        "longitude": -43.213772
      },
      {
        "latitude": -22.89633,
        "longitude": -43.21377
      },
      {
        "latitude": -22.89649,
        "longitude": -43.21352
      },
      {
        "latitude": -22.89683,
        "longitude": -43.21306
      },
      {
        "latitude": -22.8975,
        "longitude": -43.21223
      },
      {
        "latitude": -22.89857,
        "longitude": -43.21103
      },
      {
        "latitude": -22.89865,
        "longitude": -43.21087
      },
      {
        "latitude": -22.89871,
        "longitude": -43.210596
      },
      {
        "latitude": -22.89871,
        "longitude": -43.2106
      },
      {
        "latitude": -22.89872,
        "longitude": -43.21044
      },
      {
        "latitude": -22.89871,
        "longitude": -43.21023
      },
      {
        "latitude": -22.89865,
        "longitude": -43.20995
      },
      {
        "latitude": -22.89854,
        "longitude": -43.20972
      },
      {
        "latitude": -22.89831,
        "longitude": -43.2093
      },
      {
        "latitude": -22.89805,
        "longitude": -43.20869
      },
      {
        "latitude": -22.898049,
        "longitude": -43.208688
      },
      {
        "latitude": -22.8971,
        "longitude": -43.20634
      },
      {
        "latitude": -22.89294,
        "longitude": -43.19621
      },
      {
        "latitude": -22.89283,
        "longitude": -43.19588
      },
      {
        "latitude": -22.8928,
        "longitude": -43.19567
      },
      {
        "latitude": -22.89278,
        "longitude": -43.19547
      },
      {
        "latitude": -22.8928,
        "longitude": -43.19476
      },
      {
        "latitude": -22.89283,
        "longitude": -43.19174
      },
      {
        "latitude": -22.89285,
        "longitude": -43.19148
      },
      {
        "latitude": -22.8929,
        "longitude": -43.19113
      },
      {
        "latitude": -22.89298,
        "longitude": -43.19079
      },
      {
        "latitude": -22.89384,
        "longitude": -43.18816
      },
      {
        "latitude": -22.89397,
        "longitude": -43.18789
      },
      {
        "latitude": -22.8941,
        "longitude": -43.18769
      },
      {
        "latitude": -22.89422,
        "longitude": -43.18756
      },
      {
        "latitude": -22.89452,
        "longitude": -43.18733
      },
      {
        "latitude": -22.8956,
        "longitude": -43.1866
      },
      {
        "latitude": -22.8958,
        "longitude": -43.18645
      },
      {
        "latitude": -22.89594,
        "longitude": -43.18628
      },
      {
        "latitude": -22.89603,
        "longitude": -43.18613
      },
      {
        "latitude": -22.89808,
        "longitude": -43.18022
      },
      {
        "latitude": -22.89819,
        "longitude": -43.17981
      },
      {
        "latitude": -22.89834,
        "longitude": -43.17894
      },
      {
        "latitude": -22.89851,
        "longitude": -43.17827
      },
      {
        "latitude": -22.89892,
        "longitude": -43.17717
      },
      {
        "latitude": -22.89909,
        "longitude": -43.17674
      },
      {
        "latitude": -22.8993,
        "longitude": -43.17636
      },
      {
        "latitude": -22.8995,
        "longitude": -43.17612
      },
      {
        "latitude": -22.90036,
        "longitude": -43.17544
      },
      {
        "latitude": -22.90394,
        "longitude": -43.1725
      },
      {
        "latitude": -22.90423,
        "longitude": -43.17209
      },
      {
        "latitude": -22.90443,
        "longitude": -43.1717
      },
      {
        "latitude": -22.90538,
        "longitude": -43.16913
      },
      {
        "latitude": -22.90548,
        "longitude": -43.16894
      },
      {
        "latitude": -22.90557,
        "longitude": -43.16883
      },
      {
        "latitude": -22.9057,
        "longitude": -43.16873
      },
      {
        "latitude": -22.90581,
        "longitude": -43.16867
      },
      {
        "latitude": -22.90593,
        "longitude": -43.16863
      },
      {
        "latitude": -22.90645,
        "longitude": -43.16859
      },
      {
        "latitude": -22.90686,
        "longitude": -43.16857
      },
      {
        "latitude": -22.90806,
        "longitude": -43.16847
      },
      {
        "latitude": -22.90981,
        "longitude": -43.16837
      },
      {
        "latitude": -22.91025,
        "longitude": -43.16835
      },
      {
        "latitude": -22.91044,
        "longitude": -43.16838
      },
      {
        "latitude": -22.91054,
        "longitude": -43.16842
      },
      {
        "latitude": -22.91075,
        "longitude": -43.16852
      },
      {
        "latitude": -22.91097,
        "longitude": -43.16867
      },
      {
        "latitude": -22.91121,
        "longitude": -43.16891
      },
      {
        "latitude": -22.91131,
        "longitude": -43.16906
      },
      {
        "latitude": -22.91144,
        "longitude": -43.16928
      },
      {
        "latitude": -22.91154,
        "longitude": -43.16952
      },
      {
        "latitude": -22.91161,
        "longitude": -43.16976
      },
      {
        "latitude": -22.91183,
        "longitude": -43.17138
      },
      {
        "latitude": -22.91209,
        "longitude": -43.17211
      },
      {
        "latitude": -22.91235,
        "longitude": -43.17249
      },
      {
        "latitude": -22.91251,
        "longitude": -43.17264
      },
      {
        "latitude": -22.91288,
        "longitude": -43.17307
      },
      {
        "latitude": -22.91348,
        "longitude": -43.17364
      },
      {
        "latitude": -22.91402,
        "longitude": -43.1741
      },
      {
        "latitude": -22.91423,
        "longitude": -43.17423
      },
      {
        "latitude": -22.91513,
        "longitude": -43.17467
      },
      {
        "latitude": -22.91534,
        "longitude": -43.17475
      },
      {
        "latitude": -22.916,
        "longitude": -43.17492
      },
      {
        "latitude": -22.91653,
        "longitude": -43.17501
      },
      {
        "latitude": -22.91712,
        "longitude": -43.17502
      },
      {
        "latitude": -22.91771,
        "longitude": -43.17496
      },
      {
        "latitude": -22.91824,
        "longitude": -43.17486
      },
      {
        "latitude": -22.91852,
        "longitude": -43.17478
      },
      {
        "latitude": -22.91896,
        "longitude": -43.17456
      },
      {
        "latitude": -22.91924,
        "longitude": -43.17445
      },
      {
        "latitude": -22.91967,
        "longitude": -43.17416
      },
      {
        "latitude": -22.91984,
        "longitude": -43.17403
      },
      {
        "latitude": -22.91999,
        "longitude": -43.17388
      },
      {
        "latitude": -22.92027,
        "longitude": -43.17355
      },
      {
        "latitude": -22.92099,
        "longitude": -43.17256
      },
      {
        "latitude": -22.92122,
        "longitude": -43.1723
      },
      {
        "latitude": -22.92175,
        "longitude": -43.17185
      },
      {
        "latitude": -22.92204,
        "longitude": -43.17168
      },
      {
        "latitude": -22.92236,
        "longitude": -43.17152
      },
      {
        "latitude": -22.92281,
        "longitude": -43.17136
      },
      {
        "latitude": -22.92322,
        "longitude": -43.17126
      },
      {
        "latitude": -22.92384,
        "longitude": -43.17122
      },
      {
        "latitude": -22.9242,
        "longitude": -43.17126
      },
      {
        "latitude": -22.9246,
        "longitude": -43.17133
      },
      {
        "latitude": -22.93254,
        "longitude": -43.17372
      },
      {
        "latitude": -22.93305,
        "longitude": -43.17381
      },
      {
        "latitude": -22.9337,
        "longitude": -43.17384
      },
      {
        "latitude": -22.93411,
        "longitude": -43.17381
      },
      {
        "latitude": -22.93541,
        "longitude": -43.1736
      },
      {
        "latitude": -22.9357,
        "longitude": -43.17353
      },
      {
        "latitude": -22.93598,
        "longitude": -43.17343
      },
      {
        "latitude": -22.93615,
        "longitude": -43.17334
      },
      {
        "latitude": -22.93648,
        "longitude": -43.17312
      },
      {
        "latitude": -22.93669,
        "longitude": -43.17292
      },
      {
        "latitude": -22.93699,
        "longitude": -43.17255
      },
      {
        "latitude": -22.93717,
        "longitude": -43.17231
      },
      {
        "latitude": -22.93764,
        "longitude": -43.17154
      },
      {
        "latitude": -22.93776,
        "longitude": -43.17136
      },
      {
        "latitude": -22.93807,
        "longitude": -43.17104
      },
      {
        "latitude": -22.93846,
        "longitude": -43.17077
      },
      {
        "latitude": -22.93873,
        "longitude": -43.17064
      },
      {
        "latitude": -22.93904,
        "longitude": -43.17054
      },
      {
        "latitude": -22.93946,
        "longitude": -43.17049
      },
      {
        "latitude": -22.93984,
        "longitude": -43.1705
      },
      {
        "latitude": -22.94039,
        "longitude": -43.17066
      },
      {
        "latitude": -22.94068,
        "longitude": -43.17079
      },
      {
        "latitude": -22.94111,
        "longitude": -43.17105
      },
      {
        "latitude": -22.94147,
        "longitude": -43.17135
      },
      {
        "latitude": -22.94163,
        "longitude": -43.17151
      },
      {
        "latitude": -22.9423,
        "longitude": -43.17228
      },
      {
        "latitude": -22.94267,
        "longitude": -43.17274
      },
      {
        "latitude": -22.9433,
        "longitude": -43.1736
      },
      {
        "latitude": -22.94343,
        "longitude": -43.17378
      },
      {
        "latitude": -22.94359,
        "longitude": -43.17411
      },
      {
        "latitude": -22.94365,
        "longitude": -43.17427
      },
      {
        "latitude": -22.94373,
        "longitude": -43.17461
      },
      {
        "latitude": -22.94375,
        "longitude": -43.17493
      },
      {
        "latitude": -22.94374,
        "longitude": -43.17521
      },
      {
        "latitude": -22.9437,
        "longitude": -43.17542
      },
      {
        "latitude": -22.94359,
        "longitude": -43.17575
      },
      {
        "latitude": -22.94351,
        "longitude": -43.17593
      },
      {
        "latitude": -22.94339,
        "longitude": -43.17613
      },
      {
        "latitude": -22.94276,
        "longitude": -43.17701
      },
      {
        "latitude": -22.94269,
        "longitude": -43.17711
      },
      {
        "latitude": -22.94248,
        "longitude": -43.17749
      },
      {
        "latitude": -22.94236,
        "longitude": -43.17782
      },
      {
        "latitude": -22.94232,
        "longitude": -43.17804
      },
      {
        "latitude": -22.94229,
        "longitude": -43.17838
      },
      {
        "latitude": -22.9423,
        "longitude": -43.17859
      },
      {
        "latitude": -22.94233,
        "longitude": -43.17883
      },
      {
        "latitude": -22.94239,
        "longitude": -43.17918
      },
      {
        "latitude": -22.94257,
        "longitude": -43.17954
      },
      {
        "latitude": -22.94271,
        "longitude": -43.17977
      },
      {
        "latitude": -22.94317,
        "longitude": -43.18037
      },
      {
        "latitude": -22.94328,
        "longitude": -43.18047
      },
      {
        "latitude": -22.94355,
        "longitude": -43.18074
      },
      {
        "latitude": -22.94392,
        "longitude": -43.18103
      },
      {
        "latitude": -22.94427,
        "longitude": -43.18126
      },
      {
        "latitude": -22.94476,
        "longitude": -43.18151
      },
      {
        "latitude": -22.94499,
        "longitude": -43.1816
      },
      {
        "latitude": -22.94543,
        "longitude": -43.18173
      },
      {
        "latitude": -22.94578,
        "longitude": -43.18181
      },
      {
        "latitude": -22.94626,
        "longitude": -43.18185
      },
      {
        "latitude": -22.94676,
        "longitude": -43.18183
      },
      {
        "latitude": -22.94723,
        "longitude": -43.18177
      },
      {
        "latitude": -22.94773,
        "longitude": -43.18164
      },
      {
        "latitude": -22.94808,
        "longitude": -43.18145
      },
      {
        "latitude": -22.94864,
        "longitude": -43.18106
      },
      {
        "latitude": -22.949,
        "longitude": -43.18085
      },
      {
        "latitude": -22.94953,
        "longitude": -43.18058
      },
      {
        "latitude": -22.95001,
        "longitude": -43.1803
      },
      {
        "latitude": -22.95041,
        "longitude": -43.18013
      },
      {
        "latitude": -22.95069,
        "longitude": -43.17998
      },
      {
        "latitude": -22.95123,
        "longitude": -43.17975
      },
      {
        "latitude": -22.95304,
        "longitude": -43.17904
      },
      {
        "latitude": -22.95384,
        "longitude": -43.17875
      },
      {
        "latitude": -22.95496,
        "longitude": -43.17828
      },
      {
        "latitude": -22.95567,
        "longitude": -43.17793
      },
      {
        "latitude": -22.95625,
        "longitude": -43.17774
      },
      {
        "latitude": -22.95708,
        "longitude": -43.17762
      },
      {
        "latitude": -22.95789,
        "longitude": -43.17745
      },
      {
        "latitude": -22.95828,
        "longitude": -43.17734
      },
      {
        "latitude": -22.95882,
        "longitude": -43.17706
      },
      {
        "latitude": -22.96091,
        "longitude": -43.1759
      },
      {
        "latitude": -22.96145,
        "longitude": -43.17561
      },
      {
        "latitude": -22.96182,
        "longitude": -43.17569
      },
      {
        "latitude": -22.96215,
        "longitude": -43.17584
      },
      {
        "latitude": -22.96227,
        "longitude": -43.17595
      },
      {
        "latitude": -22.96279,
        "longitude": -43.17677
      },
      {
        "latitude": -22.96377,
        "longitude": -43.17828
      },
      {
        "latitude": -22.96544,
        "longitude": -43.18085
      },
      {
        "latitude": -22.96624,
        "longitude": -43.18205
      },
      {
        "latitude": -22.96756,
        "longitude": -43.18407
      },
      {
        "latitude": -22.96833,
        "longitude": -43.18525
      },
      {
        "latitude": -22.9693,
        "longitude": -43.1868
      },
      {
        "latitude": -22.96959,
        "longitude": -43.18723
      },
      {
        "latitude": -22.9703,
        "longitude": -43.18829
      },
      {
        "latitude": -22.97165,
        "longitude": -43.18962
      },
      {
        "latitude": -22.97292,
        "longitude": -43.19083
      },
      {
        "latitude": -22.97366,
        "longitude": -43.19122
      },
      {
        "latitude": -22.97571,
        "longitude": -43.19229
      },
      {
        "latitude": -22.97611,
        "longitude": -43.19241
      },
      {
        "latitude": -22.97794,
        "longitude": -43.19291
      },
      {
        "latitude": -22.97854,
        "longitude": -43.19293
      },
      {
        "latitude": -22.97942,
        "longitude": -43.19286
      },
      {
        "latitude": -22.98025,
        "longitude": -43.19277
      },
      {
        "latitude": -22.98096,
        "longitude": -43.19262
      },
      {
        "latitude": -22.98178,
        "longitude": -43.19238
      },
      {
        "latitude": -22.98389,
        "longitude": -43.19175
      },
      {
        "latitude": -22.98509,
        "longitude": -43.19139
      },
      {
        "latitude": -22.98621,
        "longitude": -43.19544
      },
      {
        "latitude": -22.98622,
        "longitude": -43.19544
      },
      {
        "latitude": -22.98645,
        "longitude": -43.19631
      },
      {
        "latitude": -22.98597,
        "longitude": -43.1968
      },
      {
        "latitude": -22.98577,
        "longitude": -43.19704
      },
      {
        "latitude": -22.98576,
        "longitude": -43.19708
      },
      {
        "latitude": -22.98572,
        "longitude": -43.19738
      },
      {
        "latitude": -22.98569,
        "longitude": -43.198176
      },
      {
        "latitude": -22.9857,
        "longitude": -43.19818
      },
      {
        "latitude": -22.98567,
        "longitude": -43.19868
      },
      {
        "latitude": -22.984884,
        "longitude": -43.19864
      },
      {
        "latitude": -22.98459,
        "longitude": -43.19863
      },
      {
        "latitude": -22.98465,
        "longitude": -43.19746
      }
    ]
  },
  "606": {
    "lineNumber": "606",
    "name": "Linha 606",
    "color": "#10B981",
    "coordinates": [
      {
        "latitude": -22.89576,
        "longitude": -43.29422
      },
      {
        "latitude": -22.89575,
        "longitude": -43.29469
      },
      {
        "latitude": -22.89578,
        "longitude": -43.29618
      },
      {
        "latitude": -22.89797,
        "longitude": -43.29684
      },
      {
        "latitude": -22.89975,
        "longitude": -43.29742
      },
      {
        "latitude": -22.90285,
        "longitude": -43.29841
      },
      {
        "latitude": -22.90383,
        "longitude": -43.29869
      },
      {
        "latitude": -22.90444,
        "longitude": -43.29886
      },
      {
        "latitude": -22.90439,
        "longitude": -43.29806
      },
      {
        "latitude": -22.90432,
        "longitude": -43.29644
      },
      {
        "latitude": -22.90428,
        "longitude": -43.29559
      },
      {
        "latitude": -22.90431,
        "longitude": -43.29535
      },
      {
        "latitude": -22.90442,
        "longitude": -43.29507
      },
      {
        "latitude": -22.90451,
        "longitude": -43.29467
      },
      {
        "latitude": -22.90458,
        "longitude": -43.2945
      },
      {
        "latitude": -22.90496,
        "longitude": -43.29373
      },
      {
        "latitude": -22.90528,
        "longitude": -43.29313
      },
      {
        "latitude": -22.9053,
        "longitude": -43.29298
      },
      {
        "latitude": -22.90519,
        "longitude": -43.29154
      },
      {
        "latitude": -22.90518,
        "longitude": -43.29124
      },
      {
        "latitude": -22.90511,
        "longitude": -43.28977
      },
      {
        "latitude": -22.90508,
        "longitude": -43.28948
      },
      {
        "latitude": -22.90505,
        "longitude": -43.28932
      },
      {
        "latitude": -22.90489,
        "longitude": -43.2889
      },
      {
        "latitude": -22.90453,
        "longitude": -43.28805
      },
      {
        "latitude": -22.90446,
        "longitude": -43.2878
      },
      {
        "latitude": -22.90445,
        "longitude": -43.28766
      },
      {
        "latitude": -22.90433,
        "longitude": -43.28674
      },
      {
        "latitude": -22.90429,
        "longitude": -43.28601
      },
      {
        "latitude": -22.90426,
        "longitude": -43.2858
      },
      {
        "latitude": -22.90421,
        "longitude": -43.28563
      },
      {
        "latitude": -22.90417,
        "longitude": -43.28546
      },
      {
        "latitude": -22.90404,
        "longitude": -43.28511
      },
      {
        "latitude": -22.90373,
        "longitude": -43.28448
      },
      {
        "latitude": -22.90375,
        "longitude": -43.28439
      },
      {
        "latitude": -22.90335,
        "longitude": -43.28305
      },
      {
        "latitude": -22.90323,
        "longitude": -43.28272
      },
      {
        "latitude": -22.90299,
        "longitude": -43.28223
      },
      {
        "latitude": -22.90251,
        "longitude": -43.28124
      },
      {
        "latitude": -22.90219,
        "longitude": -43.28054
      },
      {
        "latitude": -22.90215,
        "longitude": -43.28041
      },
      {
        "latitude": -22.90215,
        "longitude": -43.28031
      },
      {
        "latitude": -22.90216,
        "longitude": -43.28025
      },
      {
        "latitude": -22.9024,
        "longitude": -43.28015
      },
      {
        "latitude": -22.90288,
        "longitude": -43.2797
      },
      {
        "latitude": -22.90347,
        "longitude": -43.27908
      },
      {
        "latitude": -22.90382,
        "longitude": -43.27874
      },
      {
        "latitude": -22.90419,
        "longitude": -43.27838
      },
      {
        "latitude": -22.90433,
        "longitude": -43.27823
      },
      {
        "latitude": -22.90463,
        "longitude": -43.27782
      },
      {
        "latitude": -22.90572,
        "longitude": -43.27683
      },
      {
        "latitude": -22.90594,
        "longitude": -43.27663
      },
      {
        "latitude": -22.90615,
        "longitude": -43.27651
      },
      {
        "latitude": -22.90682,
        "longitude": -43.2762
      },
      {
        "latitude": -22.90719,
        "longitude": -43.27674
      },
      {
        "latitude": -22.90743,
        "longitude": -43.2771
      },
      {
        "latitude": -22.90753,
        "longitude": -43.27717
      },
      {
        "latitude": -22.90761,
        "longitude": -43.27718
      },
      {
        "latitude": -22.90843,
        "longitude": -43.27665
      },
      {
        "latitude": -22.9095,
        "longitude": -43.27594
      },
      {
        "latitude": -22.9096,
        "longitude": -43.27589
      },
      {
        "latitude": -22.9103,
        "longitude": -43.27575
      },
      {
        "latitude": -22.91122,
        "longitude": -43.27559
      },
      {
        "latitude": -22.91185,
        "longitude": -43.27548
      },
      {
        "latitude": -22.91191,
        "longitude": -43.27533
      },
      {
        "latitude": -22.91178,
        "longitude": -43.27451
      },
      {
        "latitude": -22.91163,
        "longitude": -43.27362
      },
      {
        "latitude": -22.91152,
        "longitude": -43.27307
      },
      {
        "latitude": -22.91253,
        "longitude": -43.27295
      },
      {
        "latitude": -22.9128,
        "longitude": -43.27291
      },
      {
        "latitude": -22.91388,
        "longitude": -43.27278
      },
      {
        "latitude": -22.91375,
        "longitude": -43.27189
      },
      {
        "latitude": -22.91342,
        "longitude": -43.2694
      },
      {
        "latitude": -22.91332,
        "longitude": -43.26875
      },
      {
        "latitude": -22.91295,
        "longitude": -43.26665
      },
      {
        "latitude": -22.91287,
        "longitude": -43.26622
      },
      {
        "latitude": -22.91321,
        "longitude": -43.26538
      },
      {
        "latitude": -22.91378,
        "longitude": -43.26397
      },
      {
        "latitude": -22.91385,
        "longitude": -43.26387
      },
      {
        "latitude": -22.91389,
        "longitude": -43.26384
      },
      {
        "latitude": -22.91426,
        "longitude": -43.26365
      },
      {
        "latitude": -22.91518,
        "longitude": -43.26308
      },
      {
        "latitude": -22.91584,
        "longitude": -43.26262
      },
      {
        "latitude": -22.91587,
        "longitude": -43.2626
      },
      {
        "latitude": -22.91617,
        "longitude": -43.2625
      },
      {
        "latitude": -22.91624,
        "longitude": -43.26251
      },
      {
        "latitude": -22.91702,
        "longitude": -43.26278
      },
      {
        "latitude": -22.91767,
        "longitude": -43.26311
      },
      {
        "latitude": -22.91781,
        "longitude": -43.26312
      },
      {
        "latitude": -22.91823,
        "longitude": -43.263
      },
      {
        "latitude": -22.91877,
        "longitude": -43.26285
      },
      {
        "latitude": -22.91894,
        "longitude": -43.26279
      },
      {
        "latitude": -22.91903,
        "longitude": -43.26273
      },
      {
        "latitude": -22.91908,
        "longitude": -43.26266
      },
      {
        "latitude": -22.91925,
        "longitude": -43.26216
      },
      {
        "latitude": -22.91938,
        "longitude": -43.26179
      },
      {
        "latitude": -22.91944,
        "longitude": -43.26166
      },
      {
        "latitude": -22.91988,
        "longitude": -43.26147
      },
      {
        "latitude": -22.92042,
        "longitude": -43.26122
      },
      {
        "latitude": -22.92318,
        "longitude": -43.25992
      },
      {
        "latitude": -22.92389,
        "longitude": -43.25958
      },
      {
        "latitude": -22.9238,
        "longitude": -43.25894
      },
      {
        "latitude": -22.92383,
        "longitude": -43.25881
      },
      {
        "latitude": -22.92453,
        "longitude": -43.25732
      },
      {
        "latitude": -22.92547,
        "longitude": -43.25532
      },
      {
        "latitude": -22.92564,
        "longitude": -43.25498
      },
      {
        "latitude": -22.92649,
        "longitude": -43.25331
      },
      {
        "latitude": -22.92584,
        "longitude": -43.25291
      },
      {
        "latitude": -22.9248,
        "longitude": -43.25227
      },
      {
        "latitude": -22.92459,
        "longitude": -43.25207
      },
      {
        "latitude": -22.92454,
        "longitude": -43.252
      },
      {
        "latitude": -22.92445,
        "longitude": -43.25179
      },
      {
        "latitude": -22.92454,
        "longitude": -43.25153
      },
      {
        "latitude": -22.92486,
        "longitude": -43.25092
      },
      {
        "latitude": -22.92584,
        "longitude": -43.24892
      },
      {
        "latitude": -22.925841,
        "longitude": -43.248917
      },
      {
        "latitude": -22.92607,
        "longitude": -43.24845
      },
      {
        "latitude": -22.92612,
        "longitude": -43.24836
      },
      {
        "latitude": -22.9264,
        "longitude": -43.24732
      },
      {
        "latitude": -22.92643,
        "longitude": -43.24714
      },
      {
        "latitude": -22.92638,
        "longitude": -43.24649
      },
      {
        "latitude": -22.9263,
        "longitude": -43.24618
      },
      {
        "latitude": -22.92619,
        "longitude": -43.24595
      },
      {
        "latitude": -22.92591,
        "longitude": -43.24539
      },
      {
        "latitude": -22.92765,
        "longitude": -43.24427
      },
      {
        "latitude": -22.929229,
        "longitude": -43.243221
      },
      {
        "latitude": -22.92923,
        "longitude": -43.24322
      },
      {
        "latitude": -22.93181,
        "longitude": -43.24153
      },
      {
        "latitude": -22.93257,
        "longitude": -43.24103
      },
      {
        "latitude": -22.93244,
        "longitude": -43.24085
      },
      {
        "latitude": -22.93234,
        "longitude": -43.2406
      },
      {
        "latitude": -22.93195,
        "longitude": -43.23974
      },
      {
        "latitude": -22.93159,
        "longitude": -43.23903
      },
      {
        "latitude": -22.93142,
        "longitude": -43.23876
      },
      {
        "latitude": -22.93109,
        "longitude": -43.23837
      },
      {
        "latitude": -22.93057,
        "longitude": -43.23784
      },
      {
        "latitude": -22.93031,
        "longitude": -43.23763
      },
      {
        "latitude": -22.92999,
        "longitude": -43.23739
      },
      {
        "latitude": -22.92978,
        "longitude": -43.23725
      },
      {
        "latitude": -22.9284,
        "longitude": -43.23645
      },
      {
        "latitude": -22.92793,
        "longitude": -43.23619
      },
      {
        "latitude": -22.92708,
        "longitude": -43.23562
      },
      {
        "latitude": -22.92642,
        "longitude": -43.23519
      },
      {
        "latitude": -22.92566,
        "longitude": -43.23462
      },
      {
        "latitude": -22.92541,
        "longitude": -43.23433
      },
      {
        "latitude": -22.92495,
        "longitude": -43.23369
      },
      {
        "latitude": -22.9244,
        "longitude": -43.23293
      },
      {
        "latitude": -22.92378,
        "longitude": -43.23204
      },
      {
        "latitude": -22.92336,
        "longitude": -43.23146
      },
      {
        "latitude": -22.9233,
        "longitude": -43.23133
      },
      {
        "latitude": -22.92327,
        "longitude": -43.23113
      },
      {
        "latitude": -22.9233,
        "longitude": -43.23038
      },
      {
        "latitude": -22.92323,
        "longitude": -43.23034
      },
      {
        "latitude": -22.92302,
        "longitude": -43.23029
      },
      {
        "latitude": -22.92263,
        "longitude": -43.23023
      },
      {
        "latitude": -22.92217,
        "longitude": -43.23017
      },
      {
        "latitude": -22.92207,
        "longitude": -43.23013
      },
      {
        "latitude": -22.92197,
        "longitude": -43.23002
      },
      {
        "latitude": -22.92181,
        "longitude": -43.22959
      },
      {
        "latitude": -22.9211,
        "longitude": -43.2282
      },
      {
        "latitude": -22.9211,
        "longitude": -43.22821
      },
      {
        "latitude": -22.92076,
        "longitude": -43.2276
      },
      {
        "latitude": -22.92072,
        "longitude": -43.2275
      },
      {
        "latitude": -22.92054,
        "longitude": -43.22716
      },
      {
        "latitude": -22.92038,
        "longitude": -43.22681
      },
      {
        "latitude": -22.92013,
        "longitude": -43.2262
      },
      {
        "latitude": -22.920129,
        "longitude": -43.226199
      },
      {
        "latitude": -22.91987,
        "longitude": -43.22556
      },
      {
        "latitude": -22.91898,
        "longitude": -43.22382
      },
      {
        "latitude": -22.919571,
        "longitude": -43.22344
      },
      {
        "latitude": -22.92002,
        "longitude": -43.22316
      },
      {
        "latitude": -22.92032,
        "longitude": -43.22294
      },
      {
        "latitude": -22.92039,
        "longitude": -43.22282
      },
      {
        "latitude": -22.92041,
        "longitude": -43.22274
      },
      {
        "latitude": -22.9204,
        "longitude": -43.22265
      },
      {
        "latitude": -22.92037,
        "longitude": -43.22256
      },
      {
        "latitude": -22.92023,
        "longitude": -43.22224
      },
      {
        "latitude": -22.919275,
        "longitude": -43.221165
      },
      {
        "latitude": -22.91837,
        "longitude": -43.22016
      },
      {
        "latitude": -22.91825,
        "longitude": -43.22007
      },
      {
        "latitude": -22.91812,
        "longitude": -43.22001
      },
      {
        "latitude": -22.91801,
        "longitude": -43.21999
      },
      {
        "latitude": -22.91785,
        "longitude": -43.21999
      },
      {
        "latitude": -22.91767,
        "longitude": -43.21994
      },
      {
        "latitude": -22.9173,
        "longitude": -43.21985
      },
      {
        "latitude": -22.91694,
        "longitude": -43.21971
      },
      {
        "latitude": -22.91684,
        "longitude": -43.21964
      },
      {
        "latitude": -22.9168,
        "longitude": -43.21958
      },
      {
        "latitude": -22.91632,
        "longitude": -43.21821
      },
      {
        "latitude": -22.91591,
        "longitude": -43.21726
      },
      {
        "latitude": -22.91576,
        "longitude": -43.21696
      },
      {
        "latitude": -22.91567,
        "longitude": -43.21686
      },
      {
        "latitude": -22.91508,
        "longitude": -43.21649
      },
      {
        "latitude": -22.91452,
        "longitude": -43.21616
      },
      {
        "latitude": -22.91353,
        "longitude": -43.21594
      },
      {
        "latitude": -22.91342,
        "longitude": -43.21593
      },
      {
        "latitude": -22.91317,
        "longitude": -43.21595
      },
      {
        "latitude": -22.91292,
        "longitude": -43.21601
      },
      {
        "latitude": -22.9126,
        "longitude": -43.21606
      },
      {
        "latitude": -22.91179,
        "longitude": -43.21467
      },
      {
        "latitude": -22.91167,
        "longitude": -43.21453
      },
      {
        "latitude": -22.91146,
        "longitude": -43.21414
      },
      {
        "latitude": -22.91146,
        "longitude": -43.21415
      },
      {
        "latitude": -22.9112,
        "longitude": -43.21368
      },
      {
        "latitude": -22.91102,
        "longitude": -43.21327
      },
      {
        "latitude": -22.91094,
        "longitude": -43.21246
      },
      {
        "latitude": -22.91089,
        "longitude": -43.21203
      },
      {
        "latitude": -22.91089,
        "longitude": -43.21183
      },
      {
        "latitude": -22.9112,
        "longitude": -43.21018
      },
      {
        "latitude": -22.91125,
        "longitude": -43.20979
      },
      {
        "latitude": -22.91126,
        "longitude": -43.20945
      },
      {
        "latitude": -22.91123,
        "longitude": -43.20916
      },
      {
        "latitude": -22.91117,
        "longitude": -43.2088
      },
      {
        "latitude": -22.91106,
        "longitude": -43.20844
      },
      {
        "latitude": -22.9108,
        "longitude": -43.20808
      },
      {
        "latitude": -22.91074,
        "longitude": -43.20804
      },
      {
        "latitude": -22.91054,
        "longitude": -43.20801
      },
      {
        "latitude": -22.91042,
        "longitude": -43.20806
      },
      {
        "latitude": -22.91034,
        "longitude": -43.20813
      },
      {
        "latitude": -22.91028,
        "longitude": -43.20825
      },
      {
        "latitude": -22.9102,
        "longitude": -43.20856
      },
      {
        "latitude": -22.91008,
        "longitude": -43.20888
      },
      {
        "latitude": -22.90982,
        "longitude": -43.20919
      },
      {
        "latitude": -22.90973,
        "longitude": -43.20927
      },
      {
        "latitude": -22.90954,
        "longitude": -43.20936
      },
      {
        "latitude": -22.90927,
        "longitude": -43.2094
      },
      {
        "latitude": -22.90811,
        "longitude": -43.20949
      },
      {
        "latitude": -22.90632,
        "longitude": -43.20961
      },
      {
        "latitude": -22.906317,
        "longitude": -43.20961
      },
      {
        "latitude": -22.90551,
        "longitude": -43.20966
      },
      {
        "latitude": -22.90495,
        "longitude": -43.20953
      },
      {
        "latitude": -22.90126,
        "longitude": -43.20978
      },
      {
        "latitude": -22.90126,
        "longitude": -43.20977
      },
      {
        "latitude": -22.90063,
        "longitude": -43.20981
      },
      {
        "latitude": -22.90003,
        "longitude": -43.20986
      },
      {
        "latitude": -22.90004,
        "longitude": -43.21035
      },
      {
        "latitude": -22.90005,
        "longitude": -43.21042
      },
      {
        "latitude": -22.90011,
        "longitude": -43.21053
      },
      {
        "latitude": -22.90014,
        "longitude": -43.21059
      },
      {
        "latitude": -22.90013,
        "longitude": -43.21068
      },
      {
        "latitude": -22.89981,
        "longitude": -43.21107
      },
      {
        "latitude": -22.899808,
        "longitude": -43.211073
      },
      {
        "latitude": -22.89944,
        "longitude": -43.21152
      },
      {
        "latitude": -22.89897,
        "longitude": -43.21207
      },
      {
        "latitude": -22.89888,
        "longitude": -43.21209
      },
      {
        "latitude": -22.89884,
        "longitude": -43.21207
      },
      {
        "latitude": -22.898832,
        "longitude": -43.212062
      },
      {
        "latitude": -22.89884,
        "longitude": -43.21207
      },
      {
        "latitude": -22.89883,
        "longitude": -43.21206
      },
      {
        "latitude": -22.89878,
        "longitude": -43.21198
      },
      {
        "latitude": -22.89881,
        "longitude": -43.21189
      },
      {
        "latitude": -22.89932,
        "longitude": -43.211281
      }
    ]
  },
  "634": {
    "lineNumber": "634",
    "name": "Linha 634",
    "color": "#DC2626",
    "coordinates": [
      {
        "latitude": -22.926887,
        "longitude": -43.233741
      },
      {
        "latitude": -22.9269,
        "longitude": -43.23375
      },
      {
        "latitude": -22.92686,
        "longitude": -43.23402
      },
      {
        "latitude": -22.92665,
        "longitude": -43.23462
      },
      {
        "latitude": -22.92641,
        "longitude": -43.23519
      },
      {
        "latitude": -22.926043,
        "longitude": -43.234945
      },
      {
        "latitude": -22.92575,
        "longitude": -43.23471
      },
      {
        "latitude": -22.92541,
        "longitude": -43.23433
      },
      {
        "latitude": -22.92495,
        "longitude": -43.23369
      },
      {
        "latitude": -22.9244,
        "longitude": -43.23293
      },
      {
        "latitude": -22.92378,
        "longitude": -43.23204
      },
      {
        "latitude": -22.92336,
        "longitude": -43.23146
      },
      {
        "latitude": -22.9233,
        "longitude": -43.23133
      },
      {
        "latitude": -22.92327,
        "longitude": -43.23113
      },
      {
        "latitude": -22.9233,
        "longitude": -43.23038
      },
      {
        "latitude": -22.92323,
        "longitude": -43.23034
      },
      {
        "latitude": -22.92302,
        "longitude": -43.23029
      },
      {
        "latitude": -22.92263,
        "longitude": -43.23023
      },
      {
        "latitude": -22.92217,
        "longitude": -43.23017
      },
      {
        "latitude": -22.92207,
        "longitude": -43.23013
      },
      {
        "latitude": -22.92197,
        "longitude": -43.23002
      },
      {
        "latitude": -22.92181,
        "longitude": -43.22959
      },
      {
        "latitude": -22.9211,
        "longitude": -43.2282
      },
      {
        "latitude": -22.9211,
        "longitude": -43.22821
      },
      {
        "latitude": -22.92076,
        "longitude": -43.2276
      },
      {
        "latitude": -22.92072,
        "longitude": -43.2275
      },
      {
        "latitude": -22.92054,
        "longitude": -43.22716
      },
      {
        "latitude": -22.92038,
        "longitude": -43.22681
      },
      {
        "latitude": -22.92014,
        "longitude": -43.22621
      },
      {
        "latitude": -22.920136,
        "longitude": -43.2262
      },
      {
        "latitude": -22.91987,
        "longitude": -43.22556
      },
      {
        "latitude": -22.91898,
        "longitude": -43.22382
      },
      {
        "latitude": -22.919571,
        "longitude": -43.22344
      },
      {
        "latitude": -22.92002,
        "longitude": -43.22316
      },
      {
        "latitude": -22.92032,
        "longitude": -43.22294
      },
      {
        "latitude": -22.92039,
        "longitude": -43.22282
      },
      {
        "latitude": -22.92041,
        "longitude": -43.22274
      },
      {
        "latitude": -22.9204,
        "longitude": -43.22265
      },
      {
        "latitude": -22.92037,
        "longitude": -43.22256
      },
      {
        "latitude": -22.92023,
        "longitude": -43.22224
      },
      {
        "latitude": -22.919285,
        "longitude": -43.221184
      },
      {
        "latitude": -22.91837,
        "longitude": -43.22016
      },
      {
        "latitude": -22.91825,
        "longitude": -43.22007
      },
      {
        "latitude": -22.91812,
        "longitude": -43.22001
      },
      {
        "latitude": -22.91801,
        "longitude": -43.21999
      },
      {
        "latitude": -22.91785,
        "longitude": -43.21999
      },
      {
        "latitude": -22.91767,
        "longitude": -43.21994
      },
      {
        "latitude": -22.9173,
        "longitude": -43.21985
      },
      {
        "latitude": -22.91694,
        "longitude": -43.21971
      },
      {
        "latitude": -22.91684,
        "longitude": -43.21964
      },
      {
        "latitude": -22.9168,
        "longitude": -43.21958
      },
      {
        "latitude": -22.91632,
        "longitude": -43.21821
      },
      {
        "latitude": -22.91591,
        "longitude": -43.21726
      },
      {
        "latitude": -22.91576,
        "longitude": -43.21696
      },
      {
        "latitude": -22.91567,
        "longitude": -43.21686
      },
      {
        "latitude": -22.91508,
        "longitude": -43.21649
      },
      {
        "latitude": -22.91452,
        "longitude": -43.21616
      },
      {
        "latitude": -22.91353,
        "longitude": -43.21594
      },
      {
        "latitude": -22.91342,
        "longitude": -43.21593
      },
      {
        "latitude": -22.91317,
        "longitude": -43.21595
      },
      {
        "latitude": -22.91292,
        "longitude": -43.21601
      },
      {
        "latitude": -22.9126,
        "longitude": -43.21606
      },
      {
        "latitude": -22.91179,
        "longitude": -43.21467
      },
      {
        "latitude": -22.91167,
        "longitude": -43.21453
      },
      {
        "latitude": -22.91146,
        "longitude": -43.21414
      },
      {
        "latitude": -22.91146,
        "longitude": -43.21415
      },
      {
        "latitude": -22.9112,
        "longitude": -43.21368
      },
      {
        "latitude": -22.91102,
        "longitude": -43.21327
      },
      {
        "latitude": -22.91094,
        "longitude": -43.21246
      },
      {
        "latitude": -22.91089,
        "longitude": -43.21203
      },
      {
        "latitude": -22.91089,
        "longitude": -43.21183
      },
      {
        "latitude": -22.9112,
        "longitude": -43.21018
      },
      {
        "latitude": -22.91125,
        "longitude": -43.20979
      },
      {
        "latitude": -22.91126,
        "longitude": -43.20945
      },
      {
        "latitude": -22.91123,
        "longitude": -43.20916
      },
      {
        "latitude": -22.91117,
        "longitude": -43.2088
      },
      {
        "latitude": -22.91106,
        "longitude": -43.20844
      },
      {
        "latitude": -22.9108,
        "longitude": -43.20808
      },
      {
        "latitude": -22.91074,
        "longitude": -43.20804
      },
      {
        "latitude": -22.91054,
        "longitude": -43.20801
      },
      {
        "latitude": -22.91042,
        "longitude": -43.20806
      },
      {
        "latitude": -22.91034,
        "longitude": -43.20813
      },
      {
        "latitude": -22.91028,
        "longitude": -43.20825
      },
      {
        "latitude": -22.9102,
        "longitude": -43.20856
      },
      {
        "latitude": -22.91008,
        "longitude": -43.20888
      },
      {
        "latitude": -22.90982,
        "longitude": -43.20919
      },
      {
        "latitude": -22.90973,
        "longitude": -43.20927
      },
      {
        "latitude": -22.90954,
        "longitude": -43.20936
      },
      {
        "latitude": -22.90927,
        "longitude": -43.2094
      },
      {
        "latitude": -22.90811,
        "longitude": -43.20949
      },
      {
        "latitude": -22.90716,
        "longitude": -43.20955
      },
      {
        "latitude": -22.90715,
        "longitude": -43.209551
      },
      {
        "latitude": -22.90716,
        "longitude": -43.20955
      },
      {
        "latitude": -22.90632,
        "longitude": -43.20961
      },
      {
        "latitude": -22.906317,
        "longitude": -43.20961
      },
      {
        "latitude": -22.90551,
        "longitude": -43.20966
      },
      {
        "latitude": -22.90495,
        "longitude": -43.20953
      },
      {
        "latitude": -22.901221,
        "longitude": -43.209781
      },
      {
        "latitude": -22.90123,
        "longitude": -43.20978
      },
      {
        "latitude": -22.90062,
        "longitude": -43.20982
      },
      {
        "latitude": -22.90056,
        "longitude": -43.20977
      },
      {
        "latitude": -22.90052,
        "longitude": -43.20969
      },
      {
        "latitude": -22.90044,
        "longitude": -43.20847
      },
      {
        "latitude": -22.902967,
        "longitude": -43.20832
      },
      {
        "latitude": -22.90297,
        "longitude": -43.20832
      },
      {
        "latitude": -22.90411,
        "longitude": -43.20825
      },
      {
        "latitude": -22.90443,
        "longitude": -43.2082
      },
      {
        "latitude": -22.90485,
        "longitude": -43.20816
      },
      {
        "latitude": -22.90514,
        "longitude": -43.20817
      },
      {
        "latitude": -22.90532,
        "longitude": -43.20823
      },
      {
        "latitude": -22.90556,
        "longitude": -43.20838
      },
      {
        "latitude": -22.90589,
        "longitude": -43.20864
      },
      {
        "latitude": -22.90612,
        "longitude": -43.20891
      },
      {
        "latitude": -22.90632,
        "longitude": -43.20932
      },
      {
        "latitude": -22.90639,
        "longitude": -43.20953
      },
      {
        "latitude": -22.90644,
        "longitude": -43.2098
      },
      {
        "latitude": -22.90656,
        "longitude": -43.21107
      },
      {
        "latitude": -22.90674,
        "longitude": -43.21247
      },
      {
        "latitude": -22.90678,
        "longitude": -43.2132
      },
      {
        "latitude": -22.90673,
        "longitude": -43.21341
      },
      {
        "latitude": -22.90658,
        "longitude": -43.21359
      },
      {
        "latitude": -22.90585,
        "longitude": -43.21395
      },
      {
        "latitude": -22.90559,
        "longitude": -43.21401
      },
      {
        "latitude": -22.9052,
        "longitude": -43.21428
      },
      {
        "latitude": -22.90444,
        "longitude": -43.21482
      },
      {
        "latitude": -22.9037,
        "longitude": -43.21534
      },
      {
        "latitude": -22.9019,
        "longitude": -43.21653
      },
      {
        "latitude": -22.90125,
        "longitude": -43.21697
      },
      {
        "latitude": -22.90117,
        "longitude": -43.21683
      },
      {
        "latitude": -22.90034,
        "longitude": -43.21606
      },
      {
        "latitude": -22.89933,
        "longitude": -43.2167
      },
      {
        "latitude": -22.89915,
        "longitude": -43.21682
      },
      {
        "latitude": -22.89892,
        "longitude": -43.217
      },
      {
        "latitude": -22.89802,
        "longitude": -43.21761
      },
      {
        "latitude": -22.89765,
        "longitude": -43.21787
      },
      {
        "latitude": -22.89755,
        "longitude": -43.21794
      },
      {
        "latitude": -22.8972,
        "longitude": -43.21812
      },
      {
        "latitude": -22.89633,
        "longitude": -43.21868
      },
      {
        "latitude": -22.89588,
        "longitude": -43.21898
      },
      {
        "latitude": -22.89521,
        "longitude": -43.21944
      },
      {
        "latitude": -22.89514,
        "longitude": -43.2195
      },
      {
        "latitude": -22.89505,
        "longitude": -43.21962
      },
      {
        "latitude": -22.89502,
        "longitude": -43.21972
      },
      {
        "latitude": -22.89501,
        "longitude": -43.21985
      },
      {
        "latitude": -22.89504,
        "longitude": -43.21998
      },
      {
        "latitude": -22.89511,
        "longitude": -43.22014
      },
      {
        "latitude": -22.89629,
        "longitude": -43.22115
      },
      {
        "latitude": -22.89722,
        "longitude": -43.22189
      },
      {
        "latitude": -22.89837,
        "longitude": -43.22287
      },
      {
        "latitude": -22.89874,
        "longitude": -43.22319
      },
      {
        "latitude": -22.89881,
        "longitude": -43.22321
      },
      {
        "latitude": -22.89892,
        "longitude": -43.22321
      },
      {
        "latitude": -22.89928,
        "longitude": -43.22298
      },
      {
        "latitude": -22.89959,
        "longitude": -43.22278
      },
      {
        "latitude": -22.89963,
        "longitude": -43.22278
      },
      {
        "latitude": -22.89968,
        "longitude": -43.22281
      },
      {
        "latitude": -22.89972,
        "longitude": -43.22286
      },
      {
        "latitude": -22.89996,
        "longitude": -43.22326
      },
      {
        "latitude": -22.90003,
        "longitude": -43.22345
      },
      {
        "latitude": -22.90011,
        "longitude": -43.22379
      },
      {
        "latitude": -22.9003,
        "longitude": -43.22452
      },
      {
        "latitude": -22.90035,
        "longitude": -43.22477
      },
      {
        "latitude": -22.90035,
        "longitude": -43.22489
      },
      {
        "latitude": -22.90031,
        "longitude": -43.2251
      },
      {
        "latitude": -22.90022,
        "longitude": -43.22535
      },
      {
        "latitude": -22.9002,
        "longitude": -43.2256
      },
      {
        "latitude": -22.89996,
        "longitude": -43.22634
      },
      {
        "latitude": -22.89964,
        "longitude": -43.22732
      },
      {
        "latitude": -22.89962,
        "longitude": -43.22745
      },
      {
        "latitude": -22.89961,
        "longitude": -43.22762
      },
      {
        "latitude": -22.89962,
        "longitude": -43.22792
      },
      {
        "latitude": -22.90005,
        "longitude": -43.2297
      },
      {
        "latitude": -22.90051,
        "longitude": -43.23148
      },
      {
        "latitude": -22.90056,
        "longitude": -43.23173
      },
      {
        "latitude": -22.90059,
        "longitude": -43.23202
      },
      {
        "latitude": -22.90051,
        "longitude": -43.23259
      },
      {
        "latitude": -22.90044,
        "longitude": -43.23307
      },
      {
        "latitude": -22.9001,
        "longitude": -43.23457
      },
      {
        "latitude": -22.90005,
        "longitude": -43.23477
      },
      {
        "latitude": -22.89999,
        "longitude": -43.23493
      },
      {
        "latitude": -22.89975,
        "longitude": -43.2352
      },
      {
        "latitude": -22.89935,
        "longitude": -43.23561
      },
      {
        "latitude": -22.89919,
        "longitude": -43.23575
      },
      {
        "latitude": -22.89892,
        "longitude": -43.23595
      },
      {
        "latitude": -22.89872,
        "longitude": -43.23612
      },
      {
        "latitude": -22.89837,
        "longitude": -43.2367
      },
      {
        "latitude": -22.89828,
        "longitude": -43.23678
      },
      {
        "latitude": -22.8982,
        "longitude": -43.23683
      },
      {
        "latitude": -22.89796,
        "longitude": -43.23692
      },
      {
        "latitude": -22.89741,
        "longitude": -43.23684
      },
      {
        "latitude": -22.89693,
        "longitude": -43.23682
      },
      {
        "latitude": -22.89672,
        "longitude": -43.23683
      },
      {
        "latitude": -22.89653,
        "longitude": -43.23686
      },
      {
        "latitude": -22.8962,
        "longitude": -43.23694
      },
      {
        "latitude": -22.89598,
        "longitude": -43.237
      },
      {
        "latitude": -22.8959,
        "longitude": -43.23707
      },
      {
        "latitude": -22.89538,
        "longitude": -43.23779
      },
      {
        "latitude": -22.89452,
        "longitude": -43.23876
      },
      {
        "latitude": -22.89434,
        "longitude": -43.23896
      },
      {
        "latitude": -22.89402,
        "longitude": -43.23926
      },
      {
        "latitude": -22.8939,
        "longitude": -43.23932
      },
      {
        "latitude": -22.8936,
        "longitude": -43.23941
      },
      {
        "latitude": -22.89329,
        "longitude": -43.23948
      },
      {
        "latitude": -22.89299,
        "longitude": -43.23949
      },
      {
        "latitude": -22.89284,
        "longitude": -43.23953
      },
      {
        "latitude": -22.89269,
        "longitude": -43.2396
      },
      {
        "latitude": -22.89242,
        "longitude": -43.23977
      },
      {
        "latitude": -22.89212,
        "longitude": -43.23996
      },
      {
        "latitude": -22.89203,
        "longitude": -43.24002
      },
      {
        "latitude": -22.89191,
        "longitude": -43.24014
      },
      {
        "latitude": -22.89166,
        "longitude": -43.24051
      },
      {
        "latitude": -22.89073,
        "longitude": -43.24197
      },
      {
        "latitude": -22.89028,
        "longitude": -43.24264
      },
      {
        "latitude": -22.88985,
        "longitude": -43.24338
      },
      {
        "latitude": -22.8897,
        "longitude": -43.24355
      },
      {
        "latitude": -22.88933,
        "longitude": -43.24404
      },
      {
        "latitude": -22.889,
        "longitude": -43.24452
      },
      {
        "latitude": -22.88839,
        "longitude": -43.24541
      },
      {
        "latitude": -22.88728,
        "longitude": -43.24705
      },
      {
        "latitude": -22.8868,
        "longitude": -43.24771
      },
      {
        "latitude": -22.88671,
        "longitude": -43.2478
      },
      {
        "latitude": -22.88663,
        "longitude": -43.24788
      },
      {
        "latitude": -22.88645,
        "longitude": -43.24802
      },
      {
        "latitude": -22.88617,
        "longitude": -43.24814
      },
      {
        "latitude": -22.8843,
        "longitude": -43.24884
      },
      {
        "latitude": -22.88263,
        "longitude": -43.24944
      },
      {
        "latitude": -22.88135,
        "longitude": -43.24996
      },
      {
        "latitude": -22.87979,
        "longitude": -43.25053
      },
      {
        "latitude": -22.87854,
        "longitude": -43.25099
      },
      {
        "latitude": -22.87666,
        "longitude": -43.2517
      },
      {
        "latitude": -22.87535,
        "longitude": -43.25221
      },
      {
        "latitude": -22.8749,
        "longitude": -43.25238
      },
      {
        "latitude": -22.87259,
        "longitude": -43.25318
      },
      {
        "latitude": -22.87059,
        "longitude": -43.25394
      },
      {
        "latitude": -22.86931,
        "longitude": -43.25438
      },
      {
        "latitude": -22.86849,
        "longitude": -43.25466
      },
      {
        "latitude": -22.86799,
        "longitude": -43.25478
      },
      {
        "latitude": -22.86716,
        "longitude": -43.25504
      },
      {
        "latitude": -22.86704,
        "longitude": -43.25496
      },
      {
        "latitude": -22.867,
        "longitude": -43.25489
      },
      {
        "latitude": -22.86678,
        "longitude": -43.25413
      },
      {
        "latitude": -22.86616,
        "longitude": -43.252
      },
      {
        "latitude": -22.86528,
        "longitude": -43.24897
      },
      {
        "latitude": -22.86529,
        "longitude": -43.24897
      },
      {
        "latitude": -22.86504,
        "longitude": -43.24812
      },
      {
        "latitude": -22.86827,
        "longitude": -43.24759
      },
      {
        "latitude": -22.86947,
        "longitude": -43.2473
      },
      {
        "latitude": -22.86985,
        "longitude": -43.24716
      },
      {
        "latitude": -22.87023,
        "longitude": -43.24695
      },
      {
        "latitude": -22.87024,
        "longitude": -43.24697
      },
      {
        "latitude": -22.87077,
        "longitude": -43.24673
      },
      {
        "latitude": -22.87131,
        "longitude": -43.24641
      },
      {
        "latitude": -22.8714,
        "longitude": -43.24639
      },
      {
        "latitude": -22.87149,
        "longitude": -43.2464
      },
      {
        "latitude": -22.87164,
        "longitude": -43.24646
      },
      {
        "latitude": -22.87174,
        "longitude": -43.24659
      },
      {
        "latitude": -22.87178,
        "longitude": -43.24674
      },
      {
        "latitude": -22.87174,
        "longitude": -43.24696
      },
      {
        "latitude": -22.87171,
        "longitude": -43.24702
      },
      {
        "latitude": -22.87165,
        "longitude": -43.24707
      },
      {
        "latitude": -22.87159,
        "longitude": -43.24708
      },
      {
        "latitude": -22.87155,
        "longitude": -43.24706
      },
      {
        "latitude": -22.87134,
        "longitude": -43.24681
      },
      {
        "latitude": -22.87059,
        "longitude": -43.24541
      },
      {
        "latitude": -22.87056,
        "longitude": -43.24521
      },
      {
        "latitude": -22.87056,
        "longitude": -43.24512
      },
      {
        "latitude": -22.87059,
        "longitude": -43.24504
      },
      {
        "latitude": -22.87065,
        "longitude": -43.24498
      },
      {
        "latitude": -22.87071,
        "longitude": -43.24493
      },
      {
        "latitude": -22.8708,
        "longitude": -43.24492
      },
      {
        "latitude": -22.87114,
        "longitude": -43.24493
      },
      {
        "latitude": -22.87143,
        "longitude": -43.24499
      },
      {
        "latitude": -22.87152,
        "longitude": -43.24502
      },
      {
        "latitude": -22.87158,
        "longitude": -43.24509
      },
      {
        "latitude": -22.87161,
        "longitude": -43.24514
      },
      {
        "latitude": -22.87163,
        "longitude": -43.24528
      },
      {
        "latitude": -22.8716,
        "longitude": -43.2454
      },
      {
        "latitude": -22.87154,
        "longitude": -43.24547
      },
      {
        "latitude": -22.87145,
        "longitude": -43.24551
      },
      {
        "latitude": -22.87137,
        "longitude": -43.24553
      },
      {
        "latitude": -22.87066,
        "longitude": -43.24528
      },
      {
        "latitude": -22.87024,
        "longitude": -43.24518
      },
      {
        "latitude": -22.87004,
        "longitude": -43.24523
      },
      {
        "latitude": -22.8699,
        "longitude": -43.24532
      },
      {
        "latitude": -22.86984,
        "longitude": -43.2454
      },
      {
        "latitude": -22.86976,
        "longitude": -43.2456
      },
      {
        "latitude": -22.8697,
        "longitude": -43.24619
      },
      {
        "latitude": -22.86963,
        "longitude": -43.24645
      },
      {
        "latitude": -22.86951,
        "longitude": -43.24664
      },
      {
        "latitude": -22.8693,
        "longitude": -43.24687
      },
      {
        "latitude": -22.86902,
        "longitude": -43.24696
      },
      {
        "latitude": -22.8681,
        "longitude": -43.24716
      },
      {
        "latitude": -22.86689,
        "longitude": -43.24734
      },
      {
        "latitude": -22.8657,
        "longitude": -43.24755
      },
      {
        "latitude": -22.8645,
        "longitude": -43.24767
      },
      {
        "latitude": -22.864499,
        "longitude": -43.24767
      },
      {
        "latitude": -22.8645,
        "longitude": -43.24767
      },
      {
        "latitude": -22.86426,
        "longitude": -43.2477
      },
      {
        "latitude": -22.8639,
        "longitude": -43.2477
      },
      {
        "latitude": -22.86091,
        "longitude": -43.24761
      },
      {
        "latitude": -22.860902,
        "longitude": -43.24761
      },
      {
        "latitude": -22.86091,
        "longitude": -43.24761
      },
      {
        "latitude": -22.85691,
        "longitude": -43.24749
      },
      {
        "latitude": -22.856903,
        "longitude": -43.24749
      },
      {
        "latitude": -22.85691,
        "longitude": -43.24749
      },
      {
        "latitude": -22.85376,
        "longitude": -43.24741
      },
      {
        "latitude": -22.853754,
        "longitude": -43.24741
      },
      {
        "latitude": -22.85376,
        "longitude": -43.24741
      },
      {
        "latitude": -22.85315,
        "longitude": -43.24741
      },
      {
        "latitude": -22.85182,
        "longitude": -43.24733
      },
      {
        "latitude": -22.85166,
        "longitude": -43.2473
      },
      {
        "latitude": -22.851655,
        "longitude": -43.247299
      },
      {
        "latitude": -22.85112,
        "longitude": -43.24721
      },
      {
        "latitude": -22.85094,
        "longitude": -43.24714
      },
      {
        "latitude": -22.85019,
        "longitude": -43.24681
      },
      {
        "latitude": -22.84988,
        "longitude": -43.24663
      },
      {
        "latitude": -22.84955,
        "longitude": -43.2464
      },
      {
        "latitude": -22.849,
        "longitude": -43.24595
      },
      {
        "latitude": -22.84871,
        "longitude": -43.24567
      },
      {
        "latitude": -22.84818,
        "longitude": -43.24511
      },
      {
        "latitude": -22.84818,
        "longitude": -43.24512
      },
      {
        "latitude": -22.84762,
        "longitude": -43.24448
      },
      {
        "latitude": -22.84743,
        "longitude": -43.24423
      },
      {
        "latitude": -22.84727,
        "longitude": -43.24395
      },
      {
        "latitude": -22.84714,
        "longitude": -43.24365
      },
      {
        "latitude": -22.84683,
        "longitude": -43.24261
      },
      {
        "latitude": -22.84679,
        "longitude": -43.24242
      },
      {
        "latitude": -22.84664,
        "longitude": -43.24082
      },
      {
        "latitude": -22.84661,
        "longitude": -43.24062
      },
      {
        "latitude": -22.84655,
        "longitude": -43.24034
      },
      {
        "latitude": -22.84649,
        "longitude": -43.2402
      },
      {
        "latitude": -22.84641,
        "longitude": -43.24005
      },
      {
        "latitude": -22.84578,
        "longitude": -43.23913
      },
      {
        "latitude": -22.84563,
        "longitude": -43.23896
      },
      {
        "latitude": -22.84546,
        "longitude": -43.23882
      },
      {
        "latitude": -22.84515,
        "longitude": -43.23867
      },
      {
        "latitude": -22.84501,
        "longitude": -43.23863
      },
      {
        "latitude": -22.84484,
        "longitude": -43.2386
      },
      {
        "latitude": -22.84463,
        "longitude": -43.2386
      },
      {
        "latitude": -22.84426,
        "longitude": -43.23871
      },
      {
        "latitude": -22.84357,
        "longitude": -43.23901
      },
      {
        "latitude": -22.84327,
        "longitude": -43.23911
      },
      {
        "latitude": -22.84293,
        "longitude": -43.23917
      },
      {
        "latitude": -22.84275,
        "longitude": -43.23918
      },
      {
        "latitude": -22.8423,
        "longitude": -43.23917
      },
      {
        "latitude": -22.84212,
        "longitude": -43.23919
      },
      {
        "latitude": -22.84171,
        "longitude": -43.2393
      },
      {
        "latitude": -22.84153,
        "longitude": -43.23937
      },
      {
        "latitude": -22.84091,
        "longitude": -43.23976
      },
      {
        "latitude": -22.84074,
        "longitude": -43.23992
      },
      {
        "latitude": -22.84014,
        "longitude": -43.24054
      },
      {
        "latitude": -22.83944,
        "longitude": -43.24111
      },
      {
        "latitude": -22.83932,
        "longitude": -43.24116
      },
      {
        "latitude": -22.83918,
        "longitude": -43.24118
      },
      {
        "latitude": -22.83907,
        "longitude": -43.24103
      },
      {
        "latitude": -22.83876,
        "longitude": -43.24067
      },
      {
        "latitude": -22.83862,
        "longitude": -43.24049
      },
      {
        "latitude": -22.83861,
        "longitude": -43.24043
      },
      {
        "latitude": -22.8386,
        "longitude": -43.24027
      },
      {
        "latitude": -22.83862,
        "longitude": -43.24015
      },
      {
        "latitude": -22.83876,
        "longitude": -43.23999
      },
      {
        "latitude": -22.83931,
        "longitude": -43.23952
      },
      {
        "latitude": -22.83987,
        "longitude": -43.23906
      },
      {
        "latitude": -22.83974,
        "longitude": -43.23888
      },
      {
        "latitude": -22.83965,
        "longitude": -43.23883
      },
      {
        "latitude": -22.83956,
        "longitude": -43.23883
      },
      {
        "latitude": -22.83917,
        "longitude": -43.23927
      },
      {
        "latitude": -22.83852,
        "longitude": -43.23983
      },
      {
        "latitude": -22.83843,
        "longitude": -43.23991
      },
      {
        "latitude": -22.8384,
        "longitude": -43.23994
      },
      {
        "latitude": -22.83834,
        "longitude": -43.24022
      },
      {
        "latitude": -22.83835,
        "longitude": -43.2403
      },
      {
        "latitude": -22.83842,
        "longitude": -43.2404
      },
      {
        "latitude": -22.83857,
        "longitude": -43.24053
      },
      {
        "latitude": -22.83878,
        "longitude": -43.24082
      },
      {
        "latitude": -22.83902,
        "longitude": -43.24109
      },
      {
        "latitude": -22.83909,
        "longitude": -43.24124
      },
      {
        "latitude": -22.83909,
        "longitude": -43.24133
      },
      {
        "latitude": -22.83906,
        "longitude": -43.24141
      },
      {
        "latitude": -22.8383,
        "longitude": -43.24207
      },
      {
        "latitude": -22.83813,
        "longitude": -43.24216
      },
      {
        "latitude": -22.83784,
        "longitude": -43.24225
      },
      {
        "latitude": -22.83758,
        "longitude": -43.24227
      },
      {
        "latitude": -22.83734,
        "longitude": -43.24226
      },
      {
        "latitude": -22.83385,
        "longitude": -43.24193
      },
      {
        "latitude": -22.83375,
        "longitude": -43.24188
      },
      {
        "latitude": -22.83369,
        "longitude": -43.24184
      },
      {
        "latitude": -22.83357,
        "longitude": -43.24169
      },
      {
        "latitude": -22.83352,
        "longitude": -43.24149
      },
      {
        "latitude": -22.83352,
        "longitude": -43.24135
      },
      {
        "latitude": -22.83369,
        "longitude": -43.24082
      },
      {
        "latitude": -22.83376,
        "longitude": -43.24051
      },
      {
        "latitude": -22.83378,
        "longitude": -43.24015
      },
      {
        "latitude": -22.83375,
        "longitude": -43.23974
      },
      {
        "latitude": -22.83371,
        "longitude": -43.23956
      },
      {
        "latitude": -22.83361,
        "longitude": -43.23928
      },
      {
        "latitude": -22.83352,
        "longitude": -43.23911
      },
      {
        "latitude": -22.83331,
        "longitude": -43.23882
      },
      {
        "latitude": -22.833303,
        "longitude": -43.238811
      },
      {
        "latitude": -22.83298,
        "longitude": -43.23838
      },
      {
        "latitude": -22.83264,
        "longitude": -43.238
      },
      {
        "latitude": -22.83232,
        "longitude": -43.23769
      },
      {
        "latitude": -22.83197,
        "longitude": -43.2374
      },
      {
        "latitude": -22.83153,
        "longitude": -43.23711
      },
      {
        "latitude": -22.83055,
        "longitude": -43.23665
      },
      {
        "latitude": -22.83015,
        "longitude": -43.23644
      },
      {
        "latitude": -22.82955,
        "longitude": -43.23605
      },
      {
        "latitude": -22.82912,
        "longitude": -43.23582
      },
      {
        "latitude": -22.82874,
        "longitude": -43.23557
      },
      {
        "latitude": -22.8281,
        "longitude": -43.23508
      },
      {
        "latitude": -22.8259,
        "longitude": -43.23325
      },
      {
        "latitude": -22.82569,
        "longitude": -43.23298
      },
      {
        "latitude": -22.82558,
        "longitude": -43.2328
      },
      {
        "latitude": -22.82506,
        "longitude": -43.23205
      },
      {
        "latitude": -22.82473,
        "longitude": -43.23164
      },
      {
        "latitude": -22.82458,
        "longitude": -43.23152
      },
      {
        "latitude": -22.82411,
        "longitude": -43.23126
      },
      {
        "latitude": -22.8239,
        "longitude": -43.23113
      },
      {
        "latitude": -22.82365,
        "longitude": -43.23093
      },
      {
        "latitude": -22.82311,
        "longitude": -43.23045
      },
      {
        "latitude": -22.82291,
        "longitude": -43.23026
      },
      {
        "latitude": -22.82267,
        "longitude": -43.22999
      },
      {
        "latitude": -22.82126,
        "longitude": -43.22829
      },
      {
        "latitude": -22.82125,
        "longitude": -43.22831
      },
      {
        "latitude": -22.82069,
        "longitude": -43.22765
      },
      {
        "latitude": -22.82058,
        "longitude": -43.22749
      },
      {
        "latitude": -22.81889,
        "longitude": -43.22564
      },
      {
        "latitude": -22.81868,
        "longitude": -43.22544
      },
      {
        "latitude": -22.81761,
        "longitude": -43.22429
      },
      {
        "latitude": -22.817609,
        "longitude": -43.224289
      },
      {
        "latitude": -22.81584,
        "longitude": -43.22239
      },
      {
        "latitude": -22.81546,
        "longitude": -43.22199
      },
      {
        "latitude": -22.81495,
        "longitude": -43.22151
      },
      {
        "latitude": -22.81478,
        "longitude": -43.22136
      },
      {
        "latitude": -22.8134,
        "longitude": -43.22032
      },
      {
        "latitude": -22.81325,
        "longitude": -43.22019
      },
      {
        "latitude": -22.81302,
        "longitude": -43.21991
      },
      {
        "latitude": -22.81289,
        "longitude": -43.21973
      },
      {
        "latitude": -22.8123,
        "longitude": -43.2187
      },
      {
        "latitude": -22.81157,
        "longitude": -43.21749
      },
      {
        "latitude": -22.81105,
        "longitude": -43.21665
      },
      {
        "latitude": -22.81079,
        "longitude": -43.21633
      },
      {
        "latitude": -22.8104,
        "longitude": -43.21598
      },
      {
        "latitude": -22.81009,
        "longitude": -43.2158
      },
      {
        "latitude": -22.80855,
        "longitude": -43.21515
      },
      {
        "latitude": -22.80747,
        "longitude": -43.21467
      },
      {
        "latitude": -22.80709,
        "longitude": -43.2145
      },
      {
        "latitude": -22.80684,
        "longitude": -43.21436
      },
      {
        "latitude": -22.80668,
        "longitude": -43.21423
      },
      {
        "latitude": -22.80643,
        "longitude": -43.21396
      },
      {
        "latitude": -22.8063,
        "longitude": -43.21375
      },
      {
        "latitude": -22.80619,
        "longitude": -43.21352
      },
      {
        "latitude": -22.80609,
        "longitude": -43.21326
      },
      {
        "latitude": -22.80592,
        "longitude": -43.21255
      },
      {
        "latitude": -22.80581,
        "longitude": -43.2119
      },
      {
        "latitude": -22.80575,
        "longitude": -43.21154
      },
      {
        "latitude": -22.80575,
        "longitude": -43.21108
      },
      {
        "latitude": -22.80579,
        "longitude": -43.21086
      },
      {
        "latitude": -22.80589,
        "longitude": -43.21055
      },
      {
        "latitude": -22.8059,
        "longitude": -43.2104
      },
      {
        "latitude": -22.80583,
        "longitude": -43.20994
      },
      {
        "latitude": -22.80577,
        "longitude": -43.20967
      },
      {
        "latitude": -22.80553,
        "longitude": -43.20884
      },
      {
        "latitude": -22.80497,
        "longitude": -43.2068
      },
      {
        "latitude": -22.80484,
        "longitude": -43.20637
      },
      {
        "latitude": -22.80465,
        "longitude": -43.20603
      },
      {
        "latitude": -22.80455,
        "longitude": -43.20592
      },
      {
        "latitude": -22.8045,
        "longitude": -43.20581
      },
      {
        "latitude": -22.80427,
        "longitude": -43.20466
      },
      {
        "latitude": -22.80421,
        "longitude": -43.20417
      },
      {
        "latitude": -22.80421,
        "longitude": -43.20395
      },
      {
        "latitude": -22.80424,
        "longitude": -43.20373
      },
      {
        "latitude": -22.80433,
        "longitude": -43.20334
      },
      {
        "latitude": -22.8045,
        "longitude": -43.20302
      },
      {
        "latitude": -22.80479,
        "longitude": -43.20247
      },
      {
        "latitude": -22.80597,
        "longitude": -43.20036
      },
      {
        "latitude": -22.80606,
        "longitude": -43.20013
      },
      {
        "latitude": -22.80627,
        "longitude": -43.19963
      },
      {
        "latitude": -22.80659,
        "longitude": -43.19866
      },
      {
        "latitude": -22.80679,
        "longitude": -43.19818
      },
      {
        "latitude": -22.80697,
        "longitude": -43.19791
      },
      {
        "latitude": -22.80748,
        "longitude": -43.1974
      },
      {
        "latitude": -22.80812,
        "longitude": -43.1968
      },
      {
        "latitude": -22.80888,
        "longitude": -43.19611
      },
      {
        "latitude": -22.80929,
        "longitude": -43.19579
      },
      {
        "latitude": -22.80965,
        "longitude": -43.19557
      },
      {
        "latitude": -22.81033,
        "longitude": -43.19516
      },
      {
        "latitude": -22.81045,
        "longitude": -43.19507
      },
      {
        "latitude": -22.81067,
        "longitude": -43.19486
      },
      {
        "latitude": -22.81082,
        "longitude": -43.19463
      },
      {
        "latitude": -22.81107,
        "longitude": -43.19415
      },
      {
        "latitude": -22.81215,
        "longitude": -43.19191
      },
      {
        "latitude": -22.81216,
        "longitude": -43.19181
      },
      {
        "latitude": -22.81214,
        "longitude": -43.19169
      },
      {
        "latitude": -22.81204,
        "longitude": -43.19154
      },
      {
        "latitude": -22.8119,
        "longitude": -43.19142
      },
      {
        "latitude": -22.81168,
        "longitude": -43.19112
      },
      {
        "latitude": -22.81142,
        "longitude": -43.19049
      },
      {
        "latitude": -22.81125,
        "longitude": -43.18997
      },
      {
        "latitude": -22.81104,
        "longitude": -43.18936
      },
      {
        "latitude": -22.81099,
        "longitude": -43.18911
      },
      {
        "latitude": -22.81082,
        "longitude": -43.18717
      },
      {
        "latitude": -22.8108,
        "longitude": -43.18681
      },
      {
        "latitude": -22.81084,
        "longitude": -43.18524
      },
      {
        "latitude": -22.8109,
        "longitude": -43.18498
      },
      {
        "latitude": -22.81102,
        "longitude": -43.18461
      },
      {
        "latitude": -22.81115,
        "longitude": -43.18417
      },
      {
        "latitude": -22.81127,
        "longitude": -43.18392
      },
      {
        "latitude": -22.81099,
        "longitude": -43.18377
      },
      {
        "latitude": -22.81079,
        "longitude": -43.18379
      },
      {
        "latitude": -22.81058,
        "longitude": -43.18379
      },
      {
        "latitude": -22.81045,
        "longitude": -43.18376
      },
      {
        "latitude": -22.80985,
        "longitude": -43.18346
      },
      {
        "latitude": -22.8095,
        "longitude": -43.18329
      },
      {
        "latitude": -22.80905,
        "longitude": -43.18306
      },
      {
        "latitude": -22.80832,
        "longitude": -43.18274
      },
      {
        "latitude": -22.80819,
        "longitude": -43.18262
      },
      {
        "latitude": -22.80783,
        "longitude": -43.18217
      },
      {
        "latitude": -22.80749,
        "longitude": -43.18181
      },
      {
        "latitude": -22.80716,
        "longitude": -43.18158
      },
      {
        "latitude": -22.80696,
        "longitude": -43.18154
      },
      {
        "latitude": -22.80684,
        "longitude": -43.18155
      },
      {
        "latitude": -22.80671,
        "longitude": -43.1816
      },
      {
        "latitude": -22.80666,
        "longitude": -43.18169
      },
      {
        "latitude": -22.80654,
        "longitude": -43.18181
      },
      {
        "latitude": -22.80631,
        "longitude": -43.18194
      },
      {
        "latitude": -22.80617,
        "longitude": -43.18199
      },
      {
        "latitude": -22.80605,
        "longitude": -43.18203
      },
      {
        "latitude": -22.8059,
        "longitude": -43.18201
      },
      {
        "latitude": -22.8058,
        "longitude": -43.18196
      },
      {
        "latitude": -22.80542,
        "longitude": -43.18149
      },
      {
        "latitude": -22.80534,
        "longitude": -43.18141
      },
      {
        "latitude": -22.80525,
        "longitude": -43.18138
      },
      {
        "latitude": -22.80505,
        "longitude": -43.18137
      },
      {
        "latitude": -22.80476,
        "longitude": -43.1814
      },
      {
        "latitude": -22.8039,
        "longitude": -43.18139
      },
      {
        "latitude": -22.80331,
        "longitude": -43.18137
      },
      {
        "latitude": -22.80319,
        "longitude": -43.18142
      },
      {
        "latitude": -22.80307,
        "longitude": -43.18153
      },
      {
        "latitude": -22.80293,
        "longitude": -43.18167
      },
      {
        "latitude": -22.80271,
        "longitude": -43.18194
      },
      {
        "latitude": -22.80261,
        "longitude": -43.18203
      },
      {
        "latitude": -22.80245,
        "longitude": -43.18209
      },
      {
        "latitude": -22.80229,
        "longitude": -43.1821
      },
      {
        "latitude": -22.80194,
        "longitude": -43.18209
      },
      {
        "latitude": -22.80136,
        "longitude": -43.18224
      },
      {
        "latitude": -22.8005,
        "longitude": -43.18247
      },
      {
        "latitude": -22.80013,
        "longitude": -43.1826
      },
      {
        "latitude": -22.79992,
        "longitude": -43.18271
      },
      {
        "latitude": -22.79971,
        "longitude": -43.1829
      },
      {
        "latitude": -22.79902,
        "longitude": -43.18351
      },
      {
        "latitude": -22.79854,
        "longitude": -43.18369
      },
      {
        "latitude": -22.7978,
        "longitude": -43.18391
      },
      {
        "latitude": -22.79727,
        "longitude": -43.18406
      },
      {
        "latitude": -22.79718,
        "longitude": -43.18407
      },
      {
        "latitude": -22.79698,
        "longitude": -43.18404
      },
      {
        "latitude": -22.79681,
        "longitude": -43.18398
      },
      {
        "latitude": -22.79661,
        "longitude": -43.18388
      },
      {
        "latitude": -22.79564,
        "longitude": -43.18294
      },
      {
        "latitude": -22.79558,
        "longitude": -43.18288
      },
      {
        "latitude": -22.79543,
        "longitude": -43.18268
      },
      {
        "latitude": -22.79532,
        "longitude": -43.18243
      },
      {
        "latitude": -22.79516,
        "longitude": -43.18172
      },
      {
        "latitude": -22.7952,
        "longitude": -43.18039
      },
      {
        "latitude": -22.7952,
        "longitude": -43.1803
      },
      {
        "latitude": -22.79523,
        "longitude": -43.18008
      },
      {
        "latitude": -22.79555,
        "longitude": -43.17932
      },
      {
        "latitude": -22.79565,
        "longitude": -43.17907
      },
      {
        "latitude": -22.79566,
        "longitude": -43.17892
      },
      {
        "latitude": -22.79567,
        "longitude": -43.17867
      },
      {
        "latitude": -22.79558,
        "longitude": -43.17793
      },
      {
        "latitude": -22.79548,
        "longitude": -43.17759
      },
      {
        "latitude": -22.79536,
        "longitude": -43.17739
      },
      {
        "latitude": -22.79519,
        "longitude": -43.17722
      },
      {
        "latitude": -22.79501,
        "longitude": -43.17711
      },
      {
        "latitude": -22.79426,
        "longitude": -43.17679
      },
      {
        "latitude": -22.79407,
        "longitude": -43.17663
      },
      {
        "latitude": -22.79393,
        "longitude": -43.17595
      },
      {
        "latitude": -22.794,
        "longitude": -43.17564
      },
      {
        "latitude": -22.79404,
        "longitude": -43.17555
      },
      {
        "latitude": -22.79426,
        "longitude": -43.17528
      },
      {
        "latitude": -22.79435,
        "longitude": -43.17511
      },
      {
        "latitude": -22.79458,
        "longitude": -43.17392
      },
      {
        "latitude": -22.79461,
        "longitude": -43.17369
      },
      {
        "latitude": -22.79454,
        "longitude": -43.17316
      },
      {
        "latitude": -22.79438,
        "longitude": -43.17215
      },
      {
        "latitude": -22.79432,
        "longitude": -43.17201
      },
      {
        "latitude": -22.79368,
        "longitude": -43.17108
      },
      {
        "latitude": -22.79361,
        "longitude": -43.17079
      },
      {
        "latitude": -22.79354,
        "longitude": -43.17049
      },
      {
        "latitude": -22.7935,
        "longitude": -43.17037
      },
      {
        "latitude": -22.79343,
        "longitude": -43.17031
      },
      {
        "latitude": -22.79335,
        "longitude": -43.17028
      },
      {
        "latitude": -22.79307,
        "longitude": -43.17023
      },
      {
        "latitude": -22.79294,
        "longitude": -43.17019
      },
      {
        "latitude": -22.79229,
        "longitude": -43.16951
      },
      {
        "latitude": -22.7919,
        "longitude": -43.1691
      },
      {
        "latitude": -22.79115,
        "longitude": -43.16823
      },
      {
        "latitude": -22.79101,
        "longitude": -43.16794
      },
      {
        "latitude": -22.79022,
        "longitude": -43.16603
      },
      {
        "latitude": -22.78956,
        "longitude": -43.1646
      },
      {
        "latitude": -22.78924,
        "longitude": -43.16397
      },
      {
        "latitude": -22.78908,
        "longitude": -43.16365
      },
      {
        "latitude": -22.78847,
        "longitude": -43.16258
      },
      {
        "latitude": -22.78914,
        "longitude": -43.16191
      },
      {
        "latitude": -22.78896,
        "longitude": -43.16171
      },
      {
        "latitude": -22.78876,
        "longitude": -43.16148
      },
      {
        "latitude": -22.78875,
        "longitude": -43.16144
      },
      {
        "latitude": -22.78876,
        "longitude": -43.16138
      },
      {
        "latitude": -22.78896,
        "longitude": -43.16117
      },
      {
        "latitude": -22.78904,
        "longitude": -43.16116
      },
      {
        "latitude": -22.78908,
        "longitude": -43.16118
      },
      {
        "latitude": -22.78911,
        "longitude": -43.16122
      },
      {
        "latitude": -22.78921,
        "longitude": -43.16152
      }
    ]
  },
  "910": {
    "lineNumber": "910",
    "name": "Linha 910",
    "color": "#EAB308",
    "coordinates": [
      {
        "latitude": -22.84064,
        "longitude": -43.31486
      },
      {
        "latitude": -22.84064,
        "longitude": -43.31487
      },
      {
        "latitude": -22.84094,
        "longitude": -43.31575
      },
      {
        "latitude": -22.84145,
        "longitude": -43.31733
      },
      {
        "latitude": -22.84151,
        "longitude": -43.31763
      },
      {
        "latitude": -22.84154,
        "longitude": -43.31783
      },
      {
        "latitude": -22.84155,
        "longitude": -43.31891
      },
      {
        "latitude": -22.84158,
        "longitude": -43.31925
      },
      {
        "latitude": -22.84165,
        "longitude": -43.31967
      },
      {
        "latitude": -22.84176,
        "longitude": -43.31999
      },
      {
        "latitude": -22.84148,
        "longitude": -43.32044
      },
      {
        "latitude": -22.84124,
        "longitude": -43.32043
      },
      {
        "latitude": -22.841236,
        "longitude": -43.32043
      },
      {
        "latitude": -22.84109,
        "longitude": -43.32042
      },
      {
        "latitude": -22.84112,
        "longitude": -43.31981
      },
      {
        "latitude": -22.8418,
        "longitude": -43.31983
      },
      {
        "latitude": -22.84171,
        "longitude": -43.3195
      },
      {
        "latitude": -22.84166,
        "longitude": -43.31918
      },
      {
        "latitude": -22.84165,
        "longitude": -43.31894
      },
      {
        "latitude": -22.84165,
        "longitude": -43.31849
      },
      {
        "latitude": -22.84165,
        "longitude": -43.31801
      },
      {
        "latitude": -22.84162,
        "longitude": -43.31763
      },
      {
        "latitude": -22.84157,
        "longitude": -43.31739
      },
      {
        "latitude": -22.84091,
        "longitude": -43.31539
      },
      {
        "latitude": -22.84056,
        "longitude": -43.31435
      },
      {
        "latitude": -22.84023,
        "longitude": -43.31343
      },
      {
        "latitude": -22.8401,
        "longitude": -43.31262
      },
      {
        "latitude": -22.83998,
        "longitude": -43.31234
      },
      {
        "latitude": -22.83964,
        "longitude": -43.31187
      },
      {
        "latitude": -22.83961,
        "longitude": -43.31178
      },
      {
        "latitude": -22.8396,
        "longitude": -43.31158
      },
      {
        "latitude": -22.83963,
        "longitude": -43.31143
      },
      {
        "latitude": -22.83976,
        "longitude": -43.31096
      },
      {
        "latitude": -22.83977,
        "longitude": -43.31088
      },
      {
        "latitude": -22.83975,
        "longitude": -43.31073
      },
      {
        "latitude": -22.83981,
        "longitude": -43.31044
      },
      {
        "latitude": -22.84009,
        "longitude": -43.30893
      },
      {
        "latitude": -22.84041,
        "longitude": -43.30712
      },
      {
        "latitude": -22.84073,
        "longitude": -43.30526
      },
      {
        "latitude": -22.84081,
        "longitude": -43.30452
      },
      {
        "latitude": -22.84084,
        "longitude": -43.30427
      },
      {
        "latitude": -22.84082,
        "longitude": -43.30353
      },
      {
        "latitude": -22.8408,
        "longitude": -43.30314
      },
      {
        "latitude": -22.84074,
        "longitude": -43.30278
      },
      {
        "latitude": -22.84064,
        "longitude": -43.30233
      },
      {
        "latitude": -22.84045,
        "longitude": -43.3015
      },
      {
        "latitude": -22.84011,
        "longitude": -43.29985
      },
      {
        "latitude": -22.83954,
        "longitude": -43.29709
      },
      {
        "latitude": -22.83938,
        "longitude": -43.29628
      },
      {
        "latitude": -22.83936,
        "longitude": -43.29609
      },
      {
        "latitude": -22.83937,
        "longitude": -43.29577
      },
      {
        "latitude": -22.8391,
        "longitude": -43.29522
      },
      {
        "latitude": -22.83875,
        "longitude": -43.2947
      },
      {
        "latitude": -22.83857,
        "longitude": -43.2944
      },
      {
        "latitude": -22.83852,
        "longitude": -43.29429
      },
      {
        "latitude": -22.83849,
        "longitude": -43.29416
      },
      {
        "latitude": -22.83827,
        "longitude": -43.29274
      },
      {
        "latitude": -22.8381,
        "longitude": -43.29196
      },
      {
        "latitude": -22.83777,
        "longitude": -43.2905
      },
      {
        "latitude": -22.83775,
        "longitude": -43.29033
      },
      {
        "latitude": -22.83774,
        "longitude": -43.29017
      },
      {
        "latitude": -22.83776,
        "longitude": -43.29003
      },
      {
        "latitude": -22.83785,
        "longitude": -43.2892
      },
      {
        "latitude": -22.83792,
        "longitude": -43.28833
      },
      {
        "latitude": -22.8379,
        "longitude": -43.28791
      },
      {
        "latitude": -22.83789,
        "longitude": -43.28725
      },
      {
        "latitude": -22.83786,
        "longitude": -43.28692
      },
      {
        "latitude": -22.8379,
        "longitude": -43.28656
      },
      {
        "latitude": -22.83806,
        "longitude": -43.2858
      },
      {
        "latitude": -22.83807,
        "longitude": -43.2855
      },
      {
        "latitude": -22.83803,
        "longitude": -43.28535
      },
      {
        "latitude": -22.83797,
        "longitude": -43.28518
      },
      {
        "latitude": -22.83775,
        "longitude": -43.28489
      },
      {
        "latitude": -22.83589,
        "longitude": -43.28309
      },
      {
        "latitude": -22.8352,
        "longitude": -43.28226
      },
      {
        "latitude": -22.83511,
        "longitude": -43.28208
      },
      {
        "latitude": -22.83511,
        "longitude": -43.28193
      },
      {
        "latitude": -22.83538,
        "longitude": -43.28165
      },
      {
        "latitude": -22.83624,
        "longitude": -43.28081
      },
      {
        "latitude": -22.83654,
        "longitude": -43.28052
      },
      {
        "latitude": -22.8372,
        "longitude": -43.28112
      },
      {
        "latitude": -22.83726,
        "longitude": -43.28115
      },
      {
        "latitude": -22.83735,
        "longitude": -43.28115
      },
      {
        "latitude": -22.83753,
        "longitude": -43.28111
      },
      {
        "latitude": -22.83858,
        "longitude": -43.28026
      },
      {
        "latitude": -22.83892,
        "longitude": -43.28
      },
      {
        "latitude": -22.83958,
        "longitude": -43.2795
      },
      {
        "latitude": -22.83968,
        "longitude": -43.27938
      },
      {
        "latitude": -22.84002,
        "longitude": -43.27832
      },
      {
        "latitude": -22.8402,
        "longitude": -43.27773
      },
      {
        "latitude": -22.84081,
        "longitude": -43.27569
      },
      {
        "latitude": -22.84092,
        "longitude": -43.27491
      },
      {
        "latitude": -22.84112,
        "longitude": -43.27438
      },
      {
        "latitude": -22.8418,
        "longitude": -43.27271
      },
      {
        "latitude": -22.84214,
        "longitude": -43.27205
      },
      {
        "latitude": -22.84227,
        "longitude": -43.27171
      },
      {
        "latitude": -22.84231,
        "longitude": -43.27154
      },
      {
        "latitude": -22.84234,
        "longitude": -43.2712
      },
      {
        "latitude": -22.84235,
        "longitude": -43.27093
      },
      {
        "latitude": -22.84233,
        "longitude": -43.27081
      },
      {
        "latitude": -22.84221,
        "longitude": -43.27031
      },
      {
        "latitude": -22.84216,
        "longitude": -43.26996
      },
      {
        "latitude": -22.84217,
        "longitude": -43.26977
      },
      {
        "latitude": -22.84221,
        "longitude": -43.26956
      },
      {
        "latitude": -22.84233,
        "longitude": -43.26933
      },
      {
        "latitude": -22.84256,
        "longitude": -43.26896
      },
      {
        "latitude": -22.84264,
        "longitude": -43.26886
      },
      {
        "latitude": -22.8428,
        "longitude": -43.26871
      },
      {
        "latitude": -22.843,
        "longitude": -43.26862
      },
      {
        "latitude": -22.84325,
        "longitude": -43.26855
      },
      {
        "latitude": -22.84381,
        "longitude": -43.26848
      },
      {
        "latitude": -22.84416,
        "longitude": -43.26846
      },
      {
        "latitude": -22.84425,
        "longitude": -43.26842
      },
      {
        "latitude": -22.84459,
        "longitude": -43.26814
      },
      {
        "latitude": -22.8475,
        "longitude": -43.26585
      },
      {
        "latitude": -22.85003,
        "longitude": -43.26385
      },
      {
        "latitude": -22.85454,
        "longitude": -43.26029
      },
      {
        "latitude": -22.85461,
        "longitude": -43.26015
      },
      {
        "latitude": -22.85452,
        "longitude": -43.26004
      },
      {
        "latitude": -22.8526,
        "longitude": -43.2577
      },
      {
        "latitude": -22.85232,
        "longitude": -43.25734
      },
      {
        "latitude": -22.85218,
        "longitude": -43.2571
      },
      {
        "latitude": -22.85139,
        "longitude": -43.25567
      },
      {
        "latitude": -22.85116,
        "longitude": -43.25585
      },
      {
        "latitude": -22.85029,
        "longitude": -43.25655
      },
      {
        "latitude": -22.84906,
        "longitude": -43.25528
      },
      {
        "latitude": -22.84809,
        "longitude": -43.25432
      },
      {
        "latitude": -22.84778,
        "longitude": -43.25404
      },
      {
        "latitude": -22.84765,
        "longitude": -43.25397
      },
      {
        "latitude": -22.84728,
        "longitude": -43.25389
      },
      {
        "latitude": -22.84591,
        "longitude": -43.25368
      },
      {
        "latitude": -22.84536,
        "longitude": -43.2536
      },
      {
        "latitude": -22.84548,
        "longitude": -43.2524
      },
      {
        "latitude": -22.84551,
        "longitude": -43.25209
      },
      {
        "latitude": -22.84535,
        "longitude": -43.25194
      },
      {
        "latitude": -22.84482,
        "longitude": -43.25129
      },
      {
        "latitude": -22.84401,
        "longitude": -43.2503
      },
      {
        "latitude": -22.84605,
        "longitude": -43.24845
      },
      {
        "latitude": -22.84668,
        "longitude": -43.248
      },
      {
        "latitude": -22.84721,
        "longitude": -43.24772
      },
      {
        "latitude": -22.84787,
        "longitude": -43.24753
      },
      {
        "latitude": -22.84788,
        "longitude": -43.24755
      },
      {
        "latitude": -22.84805,
        "longitude": -43.24751
      },
      {
        "latitude": -22.84826,
        "longitude": -43.24748
      },
      {
        "latitude": -22.84843,
        "longitude": -43.24747
      },
      {
        "latitude": -22.84915,
        "longitude": -43.24761
      },
      {
        "latitude": -22.84983,
        "longitude": -43.247679
      },
      {
        "latitude": -22.84984,
        "longitude": -43.24768
      },
      {
        "latitude": -22.85112,
        "longitude": -43.2478
      },
      {
        "latitude": -22.85134,
        "longitude": -43.24788
      },
      {
        "latitude": -22.85145,
        "longitude": -43.24797
      },
      {
        "latitude": -22.8515,
        "longitude": -43.24809
      },
      {
        "latitude": -22.85151,
        "longitude": -43.24816
      },
      {
        "latitude": -22.85148,
        "longitude": -43.24829
      },
      {
        "latitude": -22.85144,
        "longitude": -43.24835
      },
      {
        "latitude": -22.85137,
        "longitude": -43.24841
      },
      {
        "latitude": -22.85131,
        "longitude": -43.24843
      },
      {
        "latitude": -22.85117,
        "longitude": -43.24844
      },
      {
        "latitude": -22.85105,
        "longitude": -43.24837
      },
      {
        "latitude": -22.851,
        "longitude": -43.2483
      },
      {
        "latitude": -22.85097,
        "longitude": -43.24821
      },
      {
        "latitude": -22.85092,
        "longitude": -43.24765
      },
      {
        "latitude": -22.85086,
        "longitude": -43.24748
      },
      {
        "latitude": -22.85081,
        "longitude": -43.24737
      },
      {
        "latitude": -22.85071,
        "longitude": -43.24726
      },
      {
        "latitude": -22.85055,
        "longitude": -43.24713
      },
      {
        "latitude": -22.85032,
        "longitude": -43.247
      },
      {
        "latitude": -22.84997,
        "longitude": -43.24687
      },
      {
        "latitude": -22.84968,
        "longitude": -43.24666
      },
      {
        "latitude": -22.84942,
        "longitude": -43.24644
      },
      {
        "latitude": -22.84913,
        "longitude": -43.24616
      },
      {
        "latitude": -22.849,
        "longitude": -43.24595
      },
      {
        "latitude": -22.84871,
        "longitude": -43.24567
      },
      {
        "latitude": -22.848172,
        "longitude": -43.245101
      },
      {
        "latitude": -22.84818,
        "longitude": -43.24511
      },
      {
        "latitude": -22.84762,
        "longitude": -43.24448
      },
      {
        "latitude": -22.84743,
        "longitude": -43.24423
      },
      {
        "latitude": -22.84727,
        "longitude": -43.24395
      },
      {
        "latitude": -22.84714,
        "longitude": -43.24365
      },
      {
        "latitude": -22.84683,
        "longitude": -43.24261
      },
      {
        "latitude": -22.84679,
        "longitude": -43.24242
      },
      {
        "latitude": -22.84664,
        "longitude": -43.24082
      },
      {
        "latitude": -22.84661,
        "longitude": -43.24062
      },
      {
        "latitude": -22.84655,
        "longitude": -43.24034
      },
      {
        "latitude": -22.84649,
        "longitude": -43.2402
      },
      {
        "latitude": -22.84641,
        "longitude": -43.24005
      },
      {
        "latitude": -22.84578,
        "longitude": -43.23913
      },
      {
        "latitude": -22.84563,
        "longitude": -43.23896
      },
      {
        "latitude": -22.84546,
        "longitude": -43.23882
      },
      {
        "latitude": -22.84515,
        "longitude": -43.23867
      },
      {
        "latitude": -22.84501,
        "longitude": -43.23863
      },
      {
        "latitude": -22.84484,
        "longitude": -43.2386
      },
      {
        "latitude": -22.84463,
        "longitude": -43.2386
      },
      {
        "latitude": -22.84426,
        "longitude": -43.23871
      },
      {
        "latitude": -22.84357,
        "longitude": -43.23901
      },
      {
        "latitude": -22.84327,
        "longitude": -43.23911
      },
      {
        "latitude": -22.84293,
        "longitude": -43.23917
      },
      {
        "latitude": -22.84275,
        "longitude": -43.23918
      },
      {
        "latitude": -22.8423,
        "longitude": -43.23917
      },
      {
        "latitude": -22.84212,
        "longitude": -43.23919
      },
      {
        "latitude": -22.84171,
        "longitude": -43.2393
      },
      {
        "latitude": -22.84153,
        "longitude": -43.23937
      },
      {
        "latitude": -22.84091,
        "longitude": -43.23976
      },
      {
        "latitude": -22.84074,
        "longitude": -43.23992
      },
      {
        "latitude": -22.84014,
        "longitude": -43.24054
      },
      {
        "latitude": -22.83944,
        "longitude": -43.24111
      },
      {
        "latitude": -22.83932,
        "longitude": -43.24116
      },
      {
        "latitude": -22.83918,
        "longitude": -43.24118
      },
      {
        "latitude": -22.83907,
        "longitude": -43.24103
      },
      {
        "latitude": -22.83876,
        "longitude": -43.24067
      },
      {
        "latitude": -22.83862,
        "longitude": -43.24049
      },
      {
        "latitude": -22.83861,
        "longitude": -43.24043
      },
      {
        "latitude": -22.8386,
        "longitude": -43.24027
      },
      {
        "latitude": -22.83862,
        "longitude": -43.24015
      },
      {
        "latitude": -22.83876,
        "longitude": -43.23999
      },
      {
        "latitude": -22.838958,
        "longitude": -43.239822
      },
      {
        "latitude": -22.83896,
        "longitude": -43.23982
      },
      {
        "latitude": -22.83931,
        "longitude": -43.23952
      },
      {
        "latitude": -22.83931,
        "longitude": -43.23952
      },
      {
        "latitude": -22.83987,
        "longitude": -43.23906
      },
      {
        "latitude": -22.83974,
        "longitude": -43.23888
      },
      {
        "latitude": -22.83965,
        "longitude": -43.23883
      },
      {
        "latitude": -22.83956,
        "longitude": -43.23883
      },
      {
        "latitude": -22.83917,
        "longitude": -43.23927
      },
      {
        "latitude": -22.83852,
        "longitude": -43.23983
      },
      {
        "latitude": -22.83843,
        "longitude": -43.23991
      },
      {
        "latitude": -22.8384,
        "longitude": -43.23994
      },
      {
        "latitude": -22.83834,
        "longitude": -43.24022
      },
      {
        "latitude": -22.83835,
        "longitude": -43.2403
      },
      {
        "latitude": -22.83842,
        "longitude": -43.2404
      },
      {
        "latitude": -22.83857,
        "longitude": -43.24053
      },
      {
        "latitude": -22.83878,
        "longitude": -43.24082
      },
      {
        "latitude": -22.83902,
        "longitude": -43.24109
      },
      {
        "latitude": -22.83909,
        "longitude": -43.24124
      },
      {
        "latitude": -22.83909,
        "longitude": -43.24133
      },
      {
        "latitude": -22.83906,
        "longitude": -43.24141
      },
      {
        "latitude": -22.8383,
        "longitude": -43.24207
      },
      {
        "latitude": -22.83813,
        "longitude": -43.24216
      },
      {
        "latitude": -22.83784,
        "longitude": -43.24225
      },
      {
        "latitude": -22.83758,
        "longitude": -43.24227
      },
      {
        "latitude": -22.83734,
        "longitude": -43.24226
      },
      {
        "latitude": -22.83385,
        "longitude": -43.24193
      },
      {
        "latitude": -22.83375,
        "longitude": -43.24188
      },
      {
        "latitude": -22.83369,
        "longitude": -43.24184
      },
      {
        "latitude": -22.83357,
        "longitude": -43.24169
      },
      {
        "latitude": -22.83352,
        "longitude": -43.24149
      },
      {
        "latitude": -22.83352,
        "longitude": -43.24135
      },
      {
        "latitude": -22.83369,
        "longitude": -43.24082
      },
      {
        "latitude": -22.83376,
        "longitude": -43.24051
      },
      {
        "latitude": -22.83378,
        "longitude": -43.24015
      },
      {
        "latitude": -22.83375,
        "longitude": -43.23974
      },
      {
        "latitude": -22.83371,
        "longitude": -43.23956
      },
      {
        "latitude": -22.83361,
        "longitude": -43.23928
      },
      {
        "latitude": -22.83352,
        "longitude": -43.23911
      },
      {
        "latitude": -22.833316,
        "longitude": -43.238755
      },
      {
        "latitude": -22.83264,
        "longitude": -43.238
      },
      {
        "latitude": -22.83232,
        "longitude": -43.23769
      },
      {
        "latitude": -22.83197,
        "longitude": -43.2374
      },
      {
        "latitude": -22.83153,
        "longitude": -43.23711
      },
      {
        "latitude": -22.83055,
        "longitude": -43.23665
      },
      {
        "latitude": -22.83015,
        "longitude": -43.23644
      },
      {
        "latitude": -22.82955,
        "longitude": -43.23605
      },
      {
        "latitude": -22.82912,
        "longitude": -43.23582
      },
      {
        "latitude": -22.82874,
        "longitude": -43.23557
      },
      {
        "latitude": -22.8281,
        "longitude": -43.23508
      },
      {
        "latitude": -22.82586,
        "longitude": -43.23321
      },
      {
        "latitude": -22.82558,
        "longitude": -43.2328
      },
      {
        "latitude": -22.82506,
        "longitude": -43.23205
      },
      {
        "latitude": -22.82473,
        "longitude": -43.23164
      },
      {
        "latitude": -22.82458,
        "longitude": -43.23152
      },
      {
        "latitude": -22.82411,
        "longitude": -43.23126
      },
      {
        "latitude": -22.8239,
        "longitude": -43.23113
      },
      {
        "latitude": -22.82365,
        "longitude": -43.23093
      },
      {
        "latitude": -22.82311,
        "longitude": -43.23045
      },
      {
        "latitude": -22.82291,
        "longitude": -43.23026
      },
      {
        "latitude": -22.82267,
        "longitude": -43.22999
      },
      {
        "latitude": -22.82126,
        "longitude": -43.22829
      },
      {
        "latitude": -22.82125,
        "longitude": -43.22831
      },
      {
        "latitude": -22.82069,
        "longitude": -43.22765
      },
      {
        "latitude": -22.82058,
        "longitude": -43.22749
      },
      {
        "latitude": -22.81889,
        "longitude": -43.22564
      },
      {
        "latitude": -22.81868,
        "longitude": -43.22544
      },
      {
        "latitude": -22.81759,
        "longitude": -43.22427
      },
      {
        "latitude": -22.817587,
        "longitude": -43.224267
      },
      {
        "latitude": -22.81584,
        "longitude": -43.22239
      },
      {
        "latitude": -22.81546,
        "longitude": -43.22199
      },
      {
        "latitude": -22.81495,
        "longitude": -43.22151
      },
      {
        "latitude": -22.81478,
        "longitude": -43.22136
      },
      {
        "latitude": -22.8134,
        "longitude": -43.22032
      },
      {
        "latitude": -22.81325,
        "longitude": -43.22019
      },
      {
        "latitude": -22.81302,
        "longitude": -43.21991
      },
      {
        "latitude": -22.81289,
        "longitude": -43.21973
      },
      {
        "latitude": -22.8123,
        "longitude": -43.2187
      },
      {
        "latitude": -22.81157,
        "longitude": -43.21749
      },
      {
        "latitude": -22.81105,
        "longitude": -43.21665
      },
      {
        "latitude": -22.81079,
        "longitude": -43.21633
      },
      {
        "latitude": -22.8104,
        "longitude": -43.21598
      },
      {
        "latitude": -22.81009,
        "longitude": -43.2158
      },
      {
        "latitude": -22.80855,
        "longitude": -43.21515
      },
      {
        "latitude": -22.80747,
        "longitude": -43.21467
      },
      {
        "latitude": -22.80709,
        "longitude": -43.2145
      },
      {
        "latitude": -22.80684,
        "longitude": -43.21436
      },
      {
        "latitude": -22.80668,
        "longitude": -43.21423
      },
      {
        "latitude": -22.80643,
        "longitude": -43.21396
      },
      {
        "latitude": -22.8063,
        "longitude": -43.21375
      },
      {
        "latitude": -22.80619,
        "longitude": -43.21352
      },
      {
        "latitude": -22.80609,
        "longitude": -43.21326
      },
      {
        "latitude": -22.80592,
        "longitude": -43.21255
      },
      {
        "latitude": -22.80581,
        "longitude": -43.2119
      },
      {
        "latitude": -22.80575,
        "longitude": -43.21154
      },
      {
        "latitude": -22.80575,
        "longitude": -43.21108
      },
      {
        "latitude": -22.80579,
        "longitude": -43.21086
      },
      {
        "latitude": -22.80589,
        "longitude": -43.21055
      },
      {
        "latitude": -22.8059,
        "longitude": -43.2104
      },
      {
        "latitude": -22.80583,
        "longitude": -43.20994
      },
      {
        "latitude": -22.80577,
        "longitude": -43.20967
      },
      {
        "latitude": -22.80553,
        "longitude": -43.20884
      },
      {
        "latitude": -22.80497,
        "longitude": -43.2068
      },
      {
        "latitude": -22.80484,
        "longitude": -43.20637
      },
      {
        "latitude": -22.80465,
        "longitude": -43.20603
      },
      {
        "latitude": -22.80455,
        "longitude": -43.20592
      },
      {
        "latitude": -22.8045,
        "longitude": -43.20581
      },
      {
        "latitude": -22.80427,
        "longitude": -43.20466
      },
      {
        "latitude": -22.80421,
        "longitude": -43.20417
      },
      {
        "latitude": -22.80421,
        "longitude": -43.20395
      },
      {
        "latitude": -22.80424,
        "longitude": -43.20373
      },
      {
        "latitude": -22.80433,
        "longitude": -43.20334
      },
      {
        "latitude": -22.8045,
        "longitude": -43.20302
      },
      {
        "latitude": -22.80479,
        "longitude": -43.20247
      },
      {
        "latitude": -22.80597,
        "longitude": -43.20036
      },
      {
        "latitude": -22.80606,
        "longitude": -43.20013
      },
      {
        "latitude": -22.80619,
        "longitude": -43.19984
      },
      {
        "latitude": -22.80644,
        "longitude": -43.19913
      },
      {
        "latitude": -22.80659,
        "longitude": -43.19866
      },
      {
        "latitude": -22.80679,
        "longitude": -43.19818
      },
      {
        "latitude": -22.80697,
        "longitude": -43.19791
      },
      {
        "latitude": -22.80748,
        "longitude": -43.1974
      },
      {
        "latitude": -22.80812,
        "longitude": -43.1968
      },
      {
        "latitude": -22.80888,
        "longitude": -43.19611
      },
      {
        "latitude": -22.80929,
        "longitude": -43.19579
      },
      {
        "latitude": -22.80965,
        "longitude": -43.19557
      },
      {
        "latitude": -22.81033,
        "longitude": -43.19516
      },
      {
        "latitude": -22.81045,
        "longitude": -43.19507
      },
      {
        "latitude": -22.81067,
        "longitude": -43.19486
      },
      {
        "latitude": -22.81082,
        "longitude": -43.19463
      },
      {
        "latitude": -22.81107,
        "longitude": -43.19415
      },
      {
        "latitude": -22.81215,
        "longitude": -43.19191
      },
      {
        "latitude": -22.81216,
        "longitude": -43.19181
      },
      {
        "latitude": -22.81214,
        "longitude": -43.19169
      },
      {
        "latitude": -22.81204,
        "longitude": -43.19154
      },
      {
        "latitude": -22.8119,
        "longitude": -43.19142
      },
      {
        "latitude": -22.81168,
        "longitude": -43.19112
      },
      {
        "latitude": -22.81142,
        "longitude": -43.19049
      },
      {
        "latitude": -22.81125,
        "longitude": -43.18997
      },
      {
        "latitude": -22.81104,
        "longitude": -43.18936
      },
      {
        "latitude": -22.81099,
        "longitude": -43.18911
      },
      {
        "latitude": -22.81082,
        "longitude": -43.18717
      },
      {
        "latitude": -22.8108,
        "longitude": -43.18681
      },
      {
        "latitude": -22.81084,
        "longitude": -43.18524
      },
      {
        "latitude": -22.8109,
        "longitude": -43.18498
      },
      {
        "latitude": -22.81102,
        "longitude": -43.18461
      },
      {
        "latitude": -22.81115,
        "longitude": -43.18417
      },
      {
        "latitude": -22.81127,
        "longitude": -43.18392
      },
      {
        "latitude": -22.81099,
        "longitude": -43.18377
      },
      {
        "latitude": -22.81079,
        "longitude": -43.18379
      },
      {
        "latitude": -22.81058,
        "longitude": -43.18379
      },
      {
        "latitude": -22.81045,
        "longitude": -43.18376
      },
      {
        "latitude": -22.80985,
        "longitude": -43.18346
      },
      {
        "latitude": -22.8095,
        "longitude": -43.18329
      },
      {
        "latitude": -22.80905,
        "longitude": -43.18306
      },
      {
        "latitude": -22.80832,
        "longitude": -43.18274
      },
      {
        "latitude": -22.80819,
        "longitude": -43.18262
      },
      {
        "latitude": -22.80783,
        "longitude": -43.18217
      },
      {
        "latitude": -22.80749,
        "longitude": -43.18181
      },
      {
        "latitude": -22.80716,
        "longitude": -43.18158
      },
      {
        "latitude": -22.80696,
        "longitude": -43.18154
      },
      {
        "latitude": -22.80684,
        "longitude": -43.18155
      },
      {
        "latitude": -22.80671,
        "longitude": -43.1816
      },
      {
        "latitude": -22.80666,
        "longitude": -43.18169
      },
      {
        "latitude": -22.80654,
        "longitude": -43.18181
      },
      {
        "latitude": -22.80631,
        "longitude": -43.18194
      },
      {
        "latitude": -22.80609,
        "longitude": -43.18202
      },
      {
        "latitude": -22.80605,
        "longitude": -43.18203
      },
      {
        "latitude": -22.8059,
        "longitude": -43.18201
      },
      {
        "latitude": -22.8058,
        "longitude": -43.18196
      },
      {
        "latitude": -22.80542,
        "longitude": -43.18149
      },
      {
        "latitude": -22.80534,
        "longitude": -43.18141
      },
      {
        "latitude": -22.80525,
        "longitude": -43.18138
      },
      {
        "latitude": -22.80505,
        "longitude": -43.18137
      },
      {
        "latitude": -22.80476,
        "longitude": -43.1814
      },
      {
        "latitude": -22.8039,
        "longitude": -43.18139
      },
      {
        "latitude": -22.80331,
        "longitude": -43.18137
      },
      {
        "latitude": -22.80319,
        "longitude": -43.18142
      },
      {
        "latitude": -22.80307,
        "longitude": -43.18153
      },
      {
        "latitude": -22.80293,
        "longitude": -43.18167
      },
      {
        "latitude": -22.80271,
        "longitude": -43.18194
      },
      {
        "latitude": -22.80261,
        "longitude": -43.18203
      },
      {
        "latitude": -22.80245,
        "longitude": -43.18209
      },
      {
        "latitude": -22.80229,
        "longitude": -43.1821
      },
      {
        "latitude": -22.80194,
        "longitude": -43.18209
      },
      {
        "latitude": -22.80136,
        "longitude": -43.18224
      },
      {
        "latitude": -22.8005,
        "longitude": -43.18247
      },
      {
        "latitude": -22.80013,
        "longitude": -43.1826
      },
      {
        "latitude": -22.79992,
        "longitude": -43.18271
      },
      {
        "latitude": -22.79971,
        "longitude": -43.1829
      },
      {
        "latitude": -22.79902,
        "longitude": -43.18351
      },
      {
        "latitude": -22.79854,
        "longitude": -43.18369
      },
      {
        "latitude": -22.7978,
        "longitude": -43.18391
      },
      {
        "latitude": -22.79727,
        "longitude": -43.18406
      },
      {
        "latitude": -22.79718,
        "longitude": -43.18407
      },
      {
        "latitude": -22.79698,
        "longitude": -43.18404
      },
      {
        "latitude": -22.79681,
        "longitude": -43.18398
      },
      {
        "latitude": -22.79661,
        "longitude": -43.18388
      },
      {
        "latitude": -22.79564,
        "longitude": -43.18294
      },
      {
        "latitude": -22.79558,
        "longitude": -43.18288
      },
      {
        "latitude": -22.79543,
        "longitude": -43.18268
      },
      {
        "latitude": -22.79532,
        "longitude": -43.18243
      },
      {
        "latitude": -22.79516,
        "longitude": -43.18172
      },
      {
        "latitude": -22.7952,
        "longitude": -43.18039
      },
      {
        "latitude": -22.7952,
        "longitude": -43.1803
      },
      {
        "latitude": -22.79523,
        "longitude": -43.18008
      },
      {
        "latitude": -22.79555,
        "longitude": -43.17932
      },
      {
        "latitude": -22.79565,
        "longitude": -43.17907
      },
      {
        "latitude": -22.79566,
        "longitude": -43.17892
      },
      {
        "latitude": -22.79567,
        "longitude": -43.17867
      },
      {
        "latitude": -22.79558,
        "longitude": -43.17793
      },
      {
        "latitude": -22.79548,
        "longitude": -43.17759
      },
      {
        "latitude": -22.79536,
        "longitude": -43.17739
      },
      {
        "latitude": -22.79519,
        "longitude": -43.17722
      },
      {
        "latitude": -22.79501,
        "longitude": -43.17711
      },
      {
        "latitude": -22.79426,
        "longitude": -43.17679
      },
      {
        "latitude": -22.79407,
        "longitude": -43.17663
      },
      {
        "latitude": -22.79395,
        "longitude": -43.17608
      },
      {
        "latitude": -22.79393,
        "longitude": -43.17595
      },
      {
        "latitude": -22.794,
        "longitude": -43.17564
      },
      {
        "latitude": -22.79404,
        "longitude": -43.17555
      },
      {
        "latitude": -22.79426,
        "longitude": -43.17528
      },
      {
        "latitude": -22.79435,
        "longitude": -43.17511
      },
      {
        "latitude": -22.79446,
        "longitude": -43.17457
      },
      {
        "latitude": -22.79458,
        "longitude": -43.17392
      },
      {
        "latitude": -22.79461,
        "longitude": -43.17369
      },
      {
        "latitude": -22.79454,
        "longitude": -43.17316
      },
      {
        "latitude": -22.79438,
        "longitude": -43.17215
      },
      {
        "latitude": -22.79432,
        "longitude": -43.17201
      },
      {
        "latitude": -22.79368,
        "longitude": -43.17108
      },
      {
        "latitude": -22.79361,
        "longitude": -43.17079
      },
      {
        "latitude": -22.7935,
        "longitude": -43.17037
      },
      {
        "latitude": -22.79343,
        "longitude": -43.17031
      },
      {
        "latitude": -22.79335,
        "longitude": -43.17028
      },
      {
        "latitude": -22.79307,
        "longitude": -43.17023
      },
      {
        "latitude": -22.79294,
        "longitude": -43.17019
      },
      {
        "latitude": -22.79229,
        "longitude": -43.16951
      },
      {
        "latitude": -22.7919,
        "longitude": -43.1691
      },
      {
        "latitude": -22.79115,
        "longitude": -43.16823
      },
      {
        "latitude": -22.79101,
        "longitude": -43.16794
      },
      {
        "latitude": -22.79022,
        "longitude": -43.16603
      },
      {
        "latitude": -22.78956,
        "longitude": -43.1646
      },
      {
        "latitude": -22.78924,
        "longitude": -43.16397
      },
      {
        "latitude": -22.78908,
        "longitude": -43.16365
      },
      {
        "latitude": -22.78847,
        "longitude": -43.16258
      },
      {
        "latitude": -22.78914,
        "longitude": -43.16191
      },
      {
        "latitude": -22.78896,
        "longitude": -43.16171
      }
    ]
  }
};
