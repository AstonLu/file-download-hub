# 凱基證券金融市場部門 FICC 與衍生品收入樹深度研究

## 研究結論

以你提供的內部錨點來看，這個 desk 的經濟本質不是「券商綜合收入縮影」，而是**風險倉位＋製造利潤主導**的 FICC/衍生品平台：**Trading PNL 56% + OTC Derivatives 33% = 89%**，已足以判定本部門的核心不是零售經紀或財富管理，而是現金債券風險倉、自營/做市、結構化製造與場外避險。KGI 對外公開的 Global Markets/Fixed Income/Derivatives 描述，也明確聚焦在**債券承銷、債券次級市場、interest/bond/credit derivatives、CBAS、structured products、FX、foreign bonds、OSU/國際承銷**，而非零售股票經紀。 citeturn19search5turn19search4turn20view0

若把這 408mn 拆到商品層級，我的主判斷是：  
**Underwriting fee income** 主要來自 **TWD 公司債/金融債/永續債** 與 **Formosa/國際板債券**；  
**Franchise Trading** 主要來自 **OTC cash bond flow** 與 **RP/RS matched book**；  
**OTC Derivatives** 主要來自 **structured notes / leveraged notes、CBAS、IRS、FX derivatives**；  
**Trading PNL** 主要來自 **cash bond inventory、curve/roll-down、credit spread/rate positioning、basis/short-cover**；  
**Accrual book OCI** 則最可能是 **FVOCI accrual bond book 的市值與 hedge basis/funding economics** 所致，而不是單純的 vanilla TWD carry 失靈。這個結論同時受到 KGI 公開產品頁、財報揭露、TPEx 市場統計與央行利率資料支持。 citeturn1search3turn19search5turn5view3turn6view0turn27view0turn28search2turn23search0turn23search1

最重要的管理含義有三點。第一，**收入主引擎其實是 Balance Sheet + Manufacturing，不是 Flow fee**。第二，**Franchise Trading 更像是 inventory turnover 與 client facilitation 的入口，不是最終利潤池**。第三，**Accrual book OCI 轉負，對主管的真正警訊是 duration/hedge/funding architecture 是否失配**，而不是「市場不好」這麼泛的敘述。電子化、portfolio trading 與巴塞爾資本約束會持續擠壓低附加價值的 cash bond spread，但會把利潤往**高周轉資產負債表、客製化結構、可淨額化/可避險的流量產品**集中。 citeturn32search1turn16search3turn17search0turn18search0

## 研究範圍與方法

本研究**刻意排除全券商視角**。你所附兩份既有 Deep Research 報告都有可用內容，但共同偏誤是把 KGI 證券整體收入結構、零售經紀、複委託、財富管理、甚至權證零售面，拉進對「金融市場部門」的主體分析；這對你這個題目會導致錯位。因此，本文只保留兩份報告中與 **bond underwriting、secondary bond dealing、OTC derivatives、capital/market structure** 有關的片段，並用公開一手資料重建 desk economics。 fileciteturn0file0 fileciteturn0file1

事實、推論、假設的界線如下。  
**事實**：KGI 對外產品頁與財報附註、TPEx/CBC/BIS/SIFMA/MarketAxess 等公開資料。  
**推論**：你提供的 5 條內部收入科目，如何對應到公開可見的產品面與一般 sell-side desk booking logic。  
**假設**：任何無法由公開資料直接驗證的 desk 內部 booking policy，例如 Franchise Trading 與 Trading PNL 在你們 MIS 中的切割口徑。這部分我會用區間與信心水準表達，不把推論包裝成既定事實。 citeturn6view0turn19search5turn19search4turn20view0

有一個方法論上的重點需要先講清楚：**公開會計科目 ≠ 內部 desk MIS 科目**。KGI 2025 財報可以看到「Revenue from underwriting business」、「Gains/(losses) on disposal of trading securities」、「Gains/(losses) on trading securities measured at FVTPL」、「net gains/(losses) on derivative instruments-GTSM」等大科目，但看不到你內部的「Franchise Trading」與「Accrual book OCI」切法。因此，下文的 issue tree 本質上是「**用公開產品與市場證據，回推 desk 經濟來源**」，而不是對審計科目的機械重分類。 citeturn6view0turn5view3turn22view2

## 市場環境與 desk economics

先看利率與曲線。台灣公債殖利率在 2026 年明顯上移：TPEx 顯示 **10Y 台債殖利率由 3 月底 1.5336% 升至 6 月底 1.7000%**，5Y 由 **1.372% 升至 1.5800%**；CBC 在 6 月理監事會也明示「近月長短期市場利率趨升」，但維持政策利率不變，重貼現率維持 **2%**。TPEx 並指出 6 月短端走高的一個直接觸發是 **364 天期央行定存單得標利率高於市場預期，反映資金情勢趨緊**。這種環境對 desk 的意義非常直接：**承銷窗口變窄、持有長 duration cash bond 的 MTM 轉差、但 rates hedging 與 client flow 需求上升**。 citeturn26search1turn26search3turn27view0turn35view0

再看信用。可公開觀察到的美元信用市場，截至 2026-07-23，FRED 顯示 **US IG OAS 約 79bp、US HY OAS 約 2.77%**；這代表全球信用市場不是 stress regime，而更接近 **spread-tight / risk-on 但已不便宜** 的狀態。對以 Formosa bond、foreign bonds、credit inventory、credit-linked structured products 為收入來源之一的 desk 而言，這通常意味著：**新承銷較容易、客戶買債意願尚可、inventory carry 尚在，但 spread compression 可持續空間變小，P&L 對利率上行更敏感**。 citeturn12search3turn11search0turn12search4

再看波動率。Cboe 顯示 **VIX 在 2026-07-23 為 18.70**，6 月則大致由 **15.3 升至 16.5**，仍屬中等而非危機級別波動。這對 structured notes、option premia、FX/equity linked manufacturing 是偏正面的：**vol 不低到完全沒有定價空間，也不高到 hedging 崩壞**。就 TWD 現貨匯率來看，CBC 資料顯示 2026 年 4–6 月 USD/TWD 大致在 **31.38–31.67** 區間內波動，現貨面算穩定；但可公開取得的台灣券商 OTC FX implied-vol 一手時間序列有限，因此對「匯率 vol 是否顯著推升 desk 收入」我只給中低信心。 citeturn13search0turn13search1turn15search2turn10search1

台灣債市結構也非常關鍵。TPEx 2026 年 6 月顯示，**新台幣債券交易日均值 1,425.98 億元，其中附條件交易 1,333.53 億元，占 93.52%，買賣斷只占 6.48%**。這是本研究很重要的結論基礎：**台灣債券 desk 的基本盤，本來就不是只靠 outright turnover，而是 heavily funding/intermediation-driven**。TPEx 亦明示，附條件交易可在債券等殖成交系統、國際債券交易系統、或證券商營業處所進行，客戶需先與券商簽署債券附條件買賣總契約；KGI 財報則揭露其帳上有 **21.1bn 的 bonds with reverse repurchase agreements**，且 repo/reverse repo 利息按期間認列。換言之，**RP/RS matched book 是這個 desk 不可忽略的收入底盤**。 citeturn27view0turn9search0turn8search4turn8search2turn4view0turn22view4

公開產品面也能顯示 desk 重心。KGI 對外明載，Global Markets/Fixed Income 不只做 **bond underwriting、secondary trading、Formosa bonds**，還做 **interest、bond、credit derivatives、CBAS、structured products、FX spot or derivatives**；OSU 頁面又把 **衍生性商品－利率、信用、外國債券、外匯、國際承銷** 拉成獨立對口。更進一步，KGI 2025 年底衍生品帳面名目拆解顯示：**Structured notes、CBAS、IRS、FX derivatives、credit derivatives、accumulators/decumulators** 都在表內，但規模差異很大，**structured notes 與 CBAS 顯著大於純 credit derivatives**。TPEx 2026 年 4 月的券商 OTC 統計也吻合這件事：**IRS 流通餘額 1.42 兆、結構型商品 1,408.69 億、CBAS 固收腿 1,318.88 億、CBAS 選擇權腿 2,315.03 億；信用衍生品流通餘額則是 0**。這使得「OTC Derivatives 收入池以 IRS/CBAS/structured notes/FX 為主，而非 CDS 為主」成為高可信度判斷。 citeturn19search5turn19search4turn20view0turn5view3turn28search2turn28search0

最後是結構性衝擊。SIFMA 2025 指出，固定收益市場電子化持續上升，**Treasuries 電子化不到 60%，IG corporates 約 50%，HY 約 33%**；MarketAxess 則公告 2025 年底 **U.S. credit portfolio trading market share 約 20.6%**，而且 variable fee per million 受 protocol mix 壓力下滑。對台灣 FICC desk 的含義不是「明天就全面電子化」，而是更現實的兩件事：**low-touch bond flow spread 會被壓縮**，以及**portfolio/basket execution、workflow automation、balance-sheet selective deployment** 將成為勝負手。再疊加 BIS 的 FRTB 與 SA-CCR：市場風險與 OTC counterparty risk 的資本計提更嚴，會讓**庫存重、長天期、客製化且難淨額化的產品相對吃虧**。 citeturn32search1turn16search3turn17search0turn17search1turn18search0turn18search1

## ISSUE TREE 核心大表

> 說明：以下「推論占比」是**各收入科目內部**的區間與信心水準，不是審計數字；由於內部 MIS booking 口徑未公開，區間不應被解讀為精確既定值。  
> 你提供的內部錨點換算後，大致相當於：Underwriting 約 **37m**、Franchise Trading 約 **24m**、OTC Derivatives 約 **135m**、Trading PNL 約 **228m**、Accrual book OCI 約 **-12m**。

| 收入科目 | 商品 / 服務 | 收入機制 | 推論占比 | 獲利主線 | 市場狀況敏感度 | 未來成長潛力 |
|---|---|---|---|---|---|---|
| **Underwriting fee income 9%** | **TWD 公司債 / 金融債 / 永續債 / 次順位金融債**。這是 KGI 對外最明確的固定收益主戰場；其固定收益頁揭露 2025 年台幣債承銷金額 **1,268 億元**。 citeturn1search3 | 主辦承銷 fee、銷售/洽銷 fee、處理費、財顧/輔導費；若包銷帶入庫存，部分價差可能另落在 Trading PNL，而非此 line。KGI 2025 財報顯示 underwriting business revenue 以 **proceeding fee 與 underwriting of securities** 為主。 citeturn6view0 | **50–70%｜中高信心**。依 KGI 對外揭露之台幣債承銷規模、台灣本地公司債/金融債深度、以及金融債/永續債在台灣發行制度成熟度推論。 citeturn1search3turn8search2turn27view0 | **Flow** | 利率**下降或穩定**、曲線平滑：正面；信用利差**收斂**：正面；利率/信用波動過大：發行窗口易關閉；Basel 資本敏感度低於交易簿。 citeturn27view0turn12search3 | **成長**。驅動來自永續債、金融機構資本工具、企業再融資與 AI/資本支出需求；但會受利率波動拖累窗口。 citeturn27view0turn1search5 |
| **Underwriting fee income 9%** | **Formosa bond / 外幣計價國際債券 / 專業板跨境承銷**。KGI 2025 對外揭露外幣國際債承銷 **8.4 億美元**，OSU 頁也把國際承銷列為獨立服務。 citeturn1search3turn20view0 | Bookrunner / placement fee、跨境財顧 fee、distribution fee。若含流動量提供或後續做市，後續 spread/P&L 會落其他 line。TPEx 國際債公告亦可見 KGI 擔任流動量提供者。 citeturn8search3 | **20–40%｜中信心**。規模低於台幣債，但 KGI 在此市場具存在感，且與 OSU/專業投資人通路相連。 citeturn1search3turn20view0 | **Flow** | 對美元利率、美元信用利差、亞洲專業投資人風險偏好高度敏感；匯率波動高時，發行人與投資人 hedging 需求上升但發行窗口可能變窄。 citeturn27view0turn12search3turn14search2 | **成長至持平**。若亞洲 USD funding 需求持續、Formosa 市場維持深度，仍可成長；但全球 rates 高檔與 spread 不再便宜會壓抑某些發行量。 citeturn12search3turn27view0 |
| **Underwriting fee income 9%** | **政府/公營 / 其他 niche 債券承銷**，包含低機率的公共部門或特殊專案工具。公開證據較少。 | 以承銷/處理費為主。 | **<10%｜低信心**。因 TPEx/央行制度下公債 primary dealer 以標售為主，典型承銷 fee pool 不如公司債。 citeturn8search4 | **Flow** | 對政策發行節奏與殖利率曲線敏感。 | **持平**。 |
| **Franchise Trading 6%** | **TWD 政府公債 OTC outright flow**。KGI 對外稱其為中央公債交易商績效評鑑第一名，次級市場政府公債/公司債/金融債 2025 年 through dealer premises outright 約 **2,775 億元**。 citeturn1search3 | 客戶報價 bid-ask、inventory turn、auction/secondary switch execution、低風險 facilitation spread。 | **15–25%｜中信心**。政府債是 desk 的 rates franchise 核心，但台灣買賣斷市場本身在總債市交易中占比不高。 citeturn1search3turn27view0 | **Flow** | 利率波動適中：正面；單邊急升或流動性縮水：負面；信用敏感度低；電子化/低接觸 execution 壓縮 spread。 citeturn27view0turn32search1 | **持平至衰退**。純 cash RFQ edge 會被電子化壓縮，但若能結合 curve analytics、portfolio execution、inventory intelligence，仍可守住。 citeturn32search1 |
| **Franchise Trading 6%** | **TWD 公司債 / 金融債 OTC outright flow**。TPEx 制度允許在證券商營業處所與等殖系統交易，且 KGI 對外把公司債、金融債次級交易列為主營。 citeturn8search2turn1search3 | bid-ask、principal markup/markdown、switch / odd-lot liquidity provision。 | **15–25%｜中信心**。比政府債 spread 寬，但電子化較慢、流動性較差；若 KGI 客戶基礎強，盈利能力可不低。 citeturn8search2turn32search1 | **Flow** | 信用利差**收斂**：正面；spread 急 widening：庫存風險升高；利率波動高：前端 flow 增但 inventory risk 也升。 | **持平**。客戶仍需人工 liquidity，但長期受電子 RFQ 與 portfolio trading 擠壓。 citeturn32search1turn16search3 |
| **Franchise Trading 6%** | **外國債券 / 國際債券 OTC flow**。KGI 對外提供專門 foreign bonds 聯絡窗口與延長報價/受理時段。 citeturn21view0turn25search4 | 客戶買賣價差、跨時區流動性提供、inventory turnover、FX-hedged package spread。 | **30–45%｜中信心**。雖然台灣 outright 國內債成交量不大，但 foreign bonds 對專業客戶的 mark-up 可高於本地公債。KGI 將 foreign bonds 獨立成對口，也顯示其重要性。 citeturn21view0turn25search4 | **Flow** | 對美元利率、美元信用、匯率與跨時區流動性高度敏感；波動上升時客需增加，但 inventory risk 同步抬高。 citeturn27view0turn12search3turn14search2 | **成長**。高資產/專業投資人境外債需求仍在，且 KGI OSU 與 foreign-bond dealing 是自然協同。 citeturn20view0turn25search4 |
| **Franchise Trading 6%** | **RP/RS 附條件交易 / matched book**。TPEx 明示附條件交易為債市主要交易方式；6 月全市場日均值中附條件占 **93.52%**。券商與客戶須簽 repo master agreement；KGI 財報也揭露 reverse repo 資產與相關利息認列。 citeturn27view0turn9search0turn4view0turn22view4 | 借入/借出資金與券源的 matched spread、tenor mismatch spread、collateral specialness、流動性服務費。這一塊通常吃 balance sheet，而不是吃純手續費。 | **20–35%｜中信心**。雖然未必全數歸入你們「Franchise Trading」，但若 MIS 把 client repo intermediation 放在 franchise，這塊不可低估。 | **Balance Sheet** | 資金趨緊、短端利率上升：若 book 未完全 matched 則負面；特殊券/緊券：正面；信用影響次於 funding/collateral；資本要求與 LCR/NSFR/內部 FTP 敏感。 citeturn27view0turn23search1turn17search0 | **持平**。市場需求穩定，但 spread 容易被競爭與資金環境壓縮。 |
| **OTC Derivatives 33%** | **IRS / 利率交換 /（可能含少量 options 或 basis trades）**。TPEx 2026 年 4 月券商 IRS 流通餘額 **1.42 兆元**；KGI 財報亦揭露 IRS 名目部位與 IRS fair value hedge。 citeturn28search2turn5view3turn22view3 | 客戶對沖 bid-offer、swap spread、hedge rebalance、對 accrual/underwriting/inventory 的 overlay 轉單；若 desk 自留風險，也會反映在 trading PNL 或 hedge economics。 | **15–25%｜中信心**。IRS 是台灣證券商 OTC 利率產品中最有深度者之一，但台灣券商結構型商品與 CBAS 也很大。 citeturn28search2turn5view3 | **Flow** | 利率波動與曲線變化：正面；客需增加；但 FRTB/SA-CCR、unmargined OTC 會吃資本。 citeturn17search0turn18search0 | **成長**。驅動是債券發行、accrual hedge、企業/金融機構利率風險管理需求。 |
| **OTC Derivatives 33%** | **Structured notes / PPN / NPPN / leveraged notes / bond-fund-FX-equity linked notes**。KGI 對外明示其 structured products 連結股票、基金、債券、利率、匯率，且 fixed-income/derivatives 頁強調結構型商品；財報衍生品負債中 structured notes 名目值亦大。 citeturn19search0turn19search4turn19search5turn5view3 | 發行製造利潤、內含選擇權/波動率溢價、funding spread、hedge residual P&L、早贖與再平衡收益。這是典型**manufacturing margin**。 | **30–45%｜中高信心**。因 KGI 公開強調 structured products，且其財報中的 structured notes 名目值在 OTC book 中相對突出。 citeturn19search0turn5view3 | **Manufacturing** | 股/匯 vol **中等偏高**：有利定價；極端 vol：hedge 風險升高；利率高檔常利於 yield-enhancement 產品銷售；SA-CCR/CVA/內部資本配置敏感。 citeturn13search0turn18search0turn17search7 | **成長**。只要 OSU/專業投資人與高資產需求持續，這是最有可擴張性的費差池之一。 |
| **OTC Derivatives 33%** | **CBAS 固定收益腿＋選擇權腿**。TPEx 對券商 OTC 衍生性商品單獨統計 CBAS；2026 年 4 月選擇權腿流通餘額 **2,315.03 億**、固定收益腿 **1,318.88 億**，年初至 4 月成交量也高。KGI 財報亦把 CBAS-interest 與 CBAS options 分列。 citeturn28search2turn28search4turn5view3 | asset swap spread、conversion option vol、funding/basis、結構設計與 hedge 差。若客戶為 convertible investors，這 often 是高毛利但高風控產品。 | **20–35%｜中高信心**。公開市場與 KGI 帳面揭露都支持 CBAS 是台灣券商 OTC 衍生品的重要池。 | **Manufacturing** | 信用利差、股價波動、融資成本都重要； equity vol 上升通常抬高 embedded option 價值，但極端波動也放大 hedge 誤差；資本要求高於純 cash flow。 citeturn28search2turn17search0turn18search0 | **持平至成長**。台灣可轉債生態仍在，但市場深度有限、風險管理要求高。 |
| **OTC Derivatives 33%** | **FX derivatives**，含 spot/forwards/swaps/options，用於 foreign bond / OSU / 結構型商品配套。KGI OSU 頁把外匯列為獨立對口；KGI 財報亦揭露 exchange-rate derivatives。 citeturn20view0turn21view0turn5view3 | bid-offer、forward points/carry、client hedge spread、cross-currency package margin。 | **10–20%｜中信心**。TPEx 2026 年 4 月券商 FX derivatives 流通餘額僅 **41.81 億**，顯示相較 IRS/structured products 規模較小，但對 foreign bond/OSU 仍是必要模組。 citeturn28search2 | **Flow** | 匯率波動上升：客需增加；但 spot 太平穩時收益偏薄。TWD 現貨近月波動不算大，因此短期不是最大 beta。 citeturn10search1 | **持平**。主要取決於 foreign-bond 與跨境配置客需，而非台灣本地 FX OTC 市場自發放量。 |
| **OTC Derivatives 33%** | **Credit derivatives / credit-linked structures**。KGI 財報列有 credit derivatives，但 TPEx 2026 年 4 月券商信用衍生品流通餘額為 **0**。 citeturn5view3turn28search2 | CDS/CLN/TRS 類的 protection premium、structuring margin、hedge basis。 | **<5%｜中高信心**。存在於產品清單，但公開市場深度明顯不足，不像成熟 CDS dealer market。 | **Manufacturing** | 對信用利差最敏感；資本與風控要求高。 | **衰退至持平**。沒有公開證據顯示台灣券商信用衍生品正在快速擴張。 |
| **OTC Derivatives 33%** | **Equity-linked OTC / accumulators-decumulators / bespoke equity options**。KGI 財報有 equity derivative instruments 與 accumulators/decumulators。雖不屬狹義 FICC，但屬 desk 製造利潤的一部分。 citeturn5view3 | vol premium、path dependency margin、hedge slippage、客製化條款溢價。 | **5–15%｜中低信心**。存在，但若你部門真的是 FICC + rates/credit biased desk，這塊應低於 structured notes/CBAS/IRS。 | **Manufacturing** | 對 equity vol 與 skew 極敏感；波動低時 margin 受壓，高時 hedge 風險升高。 citeturn13search0turn15search2 | **持平**。偏週期與客戶風險偏好。 |
| **Trading PNL 56%** | **政府公債 inventory / curve / roll-down / auction positioning**。KGI 明示其為中央公債交易商，且 dealing/hedging 類 trading securities 損益在財報中體量很大。 citeturn1search3turn6view0 | 價格變動、carry + roll、auction concessions/re-open capture、curve flatteners/steepeners、basis 到期收斂。 | **25–40%｜中信心**。若 desk rates franchise 強，這是 Trading PNL 的重要母池。 | **Balance Sheet** | 利率下降或 favorable curve move：正面；利率急升：負面；波動適中可提高 RV 機會；資本要求提升：負面。 citeturn27view0turn17search0 | **持平**。仍是必要核心，但 alpha 逐步被資本與電子化稀釋。 |
| **Trading PNL 56%** | **信用債 inventory：公司債 / 金融債 / foreign bonds / Formosa bonds**。 | spread compression、carry、secondary repricing、new issue concession 吃進後再分銷、相對價值。 | **25–40%｜中信心**。若 desk 既做承銷又做 secondary trading，信用 inventory 通常是最大 PNL 引擎之一。 | **Balance Sheet** | 信用利差收斂：正面；spread widening：負面；利率上升且 spread 不動，仍有 duration 壓力。 citeturn12search3turn11search0 | **持平至成長**。若信用市場維持 tight-spread、低違約環境，仍有 carry；但估值已不便宜。 |
| **Trading PNL 56%** | **basis / short-cover / reverse-repo short sale / special collateral trades**。KGI 財報揭露「gains/(losses) on covering … short sales of bonds with reverse repurchase agreements」波動極大，顯示這類交易經濟上存在。 citeturn6view0turn5view0 | short-cover P&L、special repo、cash-futures 或 cash-swap basis 收斂、collateral squeeze。 | **10–20%｜中低信心**。存在明確會計痕跡，但內部占比未公開。 | **Balance Sheet** | 對 funding、券源稀缺度、rate vol 高度敏感；tight funding 或短券回補成本上升時可能受傷。 citeturn23search1turn27view0 | **持平**。屬專業 alpha，不容易大規模複製。 |
| **Trading PNL 56%** | **hedging books linked to underwriting / OTC manufacturing / secondary inventory**。公開財報中 disposal/FVTPL 皆分列 dealing、underwriting、hedging。 citeturn6view0 | hedge carry、rebalancing P&L、hedge ineffectiveness、vol/rate move 對製造產品的 residual。 | **15–25%｜中低信心**。這塊常是內部歸屬差異最大的地方，但從財報分類可知其不可忽略。 | **Balance Sheet** | 對 rates、credit、vol 全敏感；真正表現取決於 hedge ratio、gamma/vanna 管理與 booking policy。 | **持平**。不是獨立成長池，而是守住製造利潤的必要條件。 |
| **Accrual book OCI -3%** | **FVOCI accrual bond book**，可能包含政府債、金融債、公司債與部分 foreign bonds。KGI 2025 年底 FVOCI debt instruments 約 **530 億元**。 citeturn6view0turn22view2 | 票息 carry、roll-down，以及未實現評價透過 OCI 認列；若 spread/yield 上升，OCI 走負。 | **60–80%｜中信心**。就「OCI 為負」這件事本身而言，主因最可能還是未 fully hedged 的 FVOCI 債券 valuation。 | **Balance Sheet** | 利率上升、信用利差擴大：直接負面；曲線 steepening 對長 tenor 更傷；波動升高增加 hedge 成本。 citeturn26search1turn26search3turn12search3 | **衰退至持平**。若管理層更重視資本效率，accrual investment book 的風險預算通常不會無限制放大。 |
| **Accrual book OCI -3%** | **IRS hedge overlay / fair value hedge basis / hedge ineffectiveness**。KGI 公開揭露對 FVOCI 另設 IRS fair value hedge，2025 年底 IRS nominal 約 **52.34 億元**。 citeturn22view0turn22view3 | hedge leg 與 asset leg 的再定價速度、basis、tenor mismatch、designation/ineffectiveness。依會計處理，不同部位可能進 P&L 或 OCI。 | **10–25%｜中信心**。若 hedge ratio 不是 100%，或 hedge 工具與被避險資產基差變大，這塊足以把 OCI 拉負。 | **Balance Sheet** | rates vol、curve shift、swap spread/basis 都很敏感；FRTB/CVA/資本亦有間接影響。 citeturn17search0turn17search7 | **持平**。重點在風控優化，不在擴量。 |
| **Accrual book OCI -3%** | **funding transfer pricing / FX hedge carry / repo funding drag**。這是你提示中的替代假說，但公開資料只能部分支持。 | coupon − funding − hedge carry。 | **10–20%｜低信心**。若是純 vanilla TWD 公債/金融債 book，公開利率資料其實**不支持**「普遍 funding cost > coupon」作為主解；若是外幣資產、內部 FTP 較高或 FX-hedged book，則可能成立。 citeturn23search0turn23search1turn0search1turn0search4turn0search0turn0search8 | **Balance Sheet** | 對短端資金成本、FX swap points、內部 FTP 最敏感。 | **持平至衰退**。若這塊真在拖累，就該被縮表或重定價，而不是期待市場自動修復。 |

## Accrual book OCI 為負的解釋

這一段我直接給結論：**公開證據比較支持「duration / valuation / hedge-basis」主因，而不是「一般化的 TWD funding cost 已全面高於 coupon carry」**。原因很簡單。台灣政府債在 2026 年初的票面/殖利率不算低：5Y 標售票息 **1.25%**、10Y **1.375%**、20Y **1.50%**、30Y **1.875%**；同一時間，CBC 3 月隔夜拆款加權平均大約 **0.823%**，6 月 28 天與 364 天央行定存單利率約 **1.215% / 1.523%**。就公開利率看，**單純用 TWD short funding 去 carry 一般 TWD sovereign/financial paper，未必天然是負 carry**。反而，更明顯的事實是：**台灣殖利率曲線在 2026 年上半年整體上移**，10Y 台債 3 月底到 6 月底上升約 **16.6bp**，而 5Y 也上升約 **20.8bp**，這對 FVOCI 長 Duration 持券的 OCI 會直接造成壓力。 citeturn0search1turn0search4turn0search0turn0search8turn23search0turn23search1turn26search1turn26search3turn27view0

再加上 KGI 自身的公開會計揭露：公司有**大量 FVOCI 債券部位**，又用 **IRS 做 fair value hedge**；依其會計政策，fair value hedge 的 matched fair-value change 進損益，而 FVOCI 債券的未實現價格變動會走 OCI。這意味著，**同一個 accrual concept 經濟上可能是「票息還在賺、但 OCI 先變負」**。換句話說，Accrual book OCI 為負，不等於 accrual economics 全面失效；它更可能代表**被 hedge 不完全覆蓋的 duration、credit spread 或 cross-currency basis** 暫時吃掉了當期票息。 citeturn22view2turn22view3

因此，我把可能原因分級如下。  
**高信心主因**：FVOCI 債券在 rates up / spread wider 的再評價損失。  
**中信心次因**：IRS hedge design 與實際部位之間的 tenor / curve / basis mismatch。  
**低信心補充因子**：若書中有 foreign bonds、且以 FX swap 或內部 FTP 回台幣，**hedge carry / FTP** 可能把本來略正的 carry 再壓縮到負值，但我沒有找到可公開驗證 KGI 這部分的直接證據，所以不能把它當成主結論。 citeturn22view0turn22view3turn10search1

真正的管理建議不是抽象地說「市場差」，而是把 accrual book 重新拆成三塊看。第一塊是**未避險 DV01 與 spread DV01**；第二塊是**hedge effectiveness/basis**；第三塊是**all-in funding/FTP/FX carry**。若你們內部有 book-level attribution，應優先檢查的是：OCI 負值到底主要來自**cash bond price move**，還是**overlay hedge 帶來的 accounting mismatch**。如果是前者，重點是 duration 與 tenor bucket；如果是後者，重點是 hedge design 與 booking。這兩者的管理動作完全不同。 citeturn22view2turn22view3turn17search0turn18search0

## 與既有兩份報告的衝突與採信判斷

兩份既有報告最值得保留的部分，是它們都抓到三件大方向：**KGI 在債券/衍生產品確有市場地位**、**結構型/衍生品是收入重要來源**、以及**電子化與 Basel 監管會改變 desk economics**。這些方向與公開資料一致，因此可以保留。 fileciteturn0file0 fileciteturn0file1 citeturn1search3turn19search5turn19search4turn32search1turn17search0turn18search0

但兩份報告最明顯的偏差，是把**全券商收入主體**誤投影到你的部門。尤其是零售股票經紀、複委託、美股活動、融資融券、財富管理、權證零售面——這些對 KGI 證券整體當然重要，可是對你此次研究主體「Global Markets = 固定收益＋衍生性商品 desk」並不是核心解釋變數。以你提供的內部收入錨點看，該 desk 的收入幾乎全都來自 **bond underwriting、franchise trading、OTC derivatives、trading PNL、accrual book**；因此，凡是沒有直接連到這五項收入機制的零售敘述，都應視為背景噪音而不是分析主體。這一點上，你的內部數據比兩份外部生成報告更可信。 fileciteturn0file0 fileciteturn0file1

若要在有衝突時排序可信度，我的排序是：  
**你提供的內部 MIS 錨點** ＞ **KGI 公開財報與產品頁** ＞ **TPEx/CBC 官方市場資料** ＞ **你提供的兩份既有報告中的可驗證片段**。  
原因不是因為那兩份報告沒價值，而是它們沒有你們 desk 內部 booking 邏輯與部門邊界。這也是我在 issue tree 裡一律用區間/高中低/信心水準，而不把任何 product split 寫成精確小數點的原因。 citeturn6view0turn19search5turn20view0turn27view0

## 關鍵來源清單

以下列出本研究最關鍵、最可供你後續進一步追頁碼/細節的一手或準一手來源：

**KGI 證券公開資料**  
KGI Securities, *Fixed Income Services / 債券業務*，2025 年台幣債承銷 **1,268 億元**、外幣國際債承銷 **8.4 億美元**、2025 年 through dealer premises outright **2,775 億元**。 citeturn1search3  
KGI Securities, *Fixed Income Services*，明示 Global Markets 涵蓋 **bond underwriting、secondary trading、interest/bond/credit derivatives、CBAS、structured products、FX spot or derivatives**。 citeturn19search5  
KGI Securities, *OSU 國際證券業務*，明示 desk 對口包含 **衍生性商品－利率、信用、外國債券、外匯、國際承銷**，且外國債券承作有延長受理時段。 citeturn20view0turn21view0  
KGI Securities, *2025 Q4 Consolidated Financial Statements*：  
- underwriting business revenue breakdown；  
- disposal/FVTPL trading securities gains by dealing / underwriting / hedging；  
- reverse repo 資產；  
- derivative notionals：IRS、CBAS、structured notes、FX、credit derivatives、accumulators/decumulators；  
- FVOCI debt instruments 與 IRS fair value hedge。 citeturn6view0turn4view0turn5view3turn22view0turn22view2turn22view3

**台灣官方市場資料**  
TPEx, *櫃檯買賣市場債券制度簡介 / 政府債券簡介 / 公司債及金融債簡介*：dealer premises、EBTS、international bond system、repo master agreement、買賣斷/附條件制度。 citeturn9search0turn8search4turn8search2  
TPEx e-Paper, 2026-07：  
- 6 月台債曲線與 10Y closing yield **1.7000%**；  
- 6 月新台幣債券交易日均值 **1,425.98 億元**，其中附條件交易占 **93.52%**。 citeturn27view0  
TPEx e-Paper, 2026-05/07：券商 OTC 衍生品市場統計，包含 **IRS、CBAS、結構型商品、信用衍生品、匯率衍生品**之流通餘額與成交資料。 citeturn28search2turn28search0  
Central Bank of the Republic of China, 2026 年公債標售結果與理監事會聲明：5Y/10Y/20Y/30Y 標售利率、政策利率維持不變、近月長短期利率趨升。 citeturn0search1turn0search4turn0search0turn0search8turn35view0  
Central Bank of the Republic of China, *Summary of Interbank Call Loan and Commercial Paper Markets* / *公開市場操作*：隔夜拆款均值約 **0.823%**、28 天 / 364 天定存單利率約 **1.215% / 1.523%**。 citeturn23search0turn23search1

**全球市場與制度資料**  
FRED / ICE BofA：截至 2026-07-23，**US IG OAS 約 79bp、US HY OAS 約 2.77%**。 citeturn12search3turn11search0  
Cboe / FRED：2026-07-23 **VIX 18.70**；6 月 VIX 大致自 **15.3 升至 16.5**。 citeturn13search0turn13search1turn15search2  
SIFMA, *Fixed Income Market Structure Compendium* 2025：Treasuries 電子化 **<60%**、IG corporates **~50%**、HY **~33%**。 citeturn32search1  
MarketAxess, 4Q25 / FY25 trading statistics：portfolio trading share 與 protocol mix 對 fee compression 的證據。 citeturn16search3turn16search0turn32search3  
BIS, *Minimum capital requirements for market risk* 2019 與 *SA-CCR*：FRTB 與 OTC counterparty capital framework 的直接原文。 citeturn17search0turn17search1turn18search0turn18search1