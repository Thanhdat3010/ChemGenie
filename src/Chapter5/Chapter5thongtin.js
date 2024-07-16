import React from 'react';
import { Collapse} from 'antd';
import "./Chapter5thongtin.css"
import Hinhchapter51 from "../Hinhchapter/Chapter5.1.png";
import Hinhchapter52 from "../Hinhchapter/Chapter5.2.png";
import Hinhchapter53 from "../Hinhchapter/Chapter5.3.png";
import Hinhchapter54 from "../Hinhchapter/Chapter5.4.png";
import Hinhchapter55 from "../Hinhchapter/Chapter5.5.png";
import Hinhchapter56 from "../Hinhchapter/Chapter5.6.png";
import Hinhchapter57 from "../Hinhchapter/Chapter5.7.png";
import Hinhchapter58 from "../Hinhchapter/Chapter5.8.png";
import Hinhchapter59 from "../Hinhchapter/Chapter5.9.png";
import Hinhchapter5101112 from "../Hinhchapter/Chapter5.101112.png";
import Hinhchapter513 from "../Hinhchapter/Chapter5.13.png";
import Hinhchapter514 from "../Hinhchapter/Chapter5.14.png";
import Hinhchapter515 from "../Hinhchapter/Chapter5.15.png";
import Hinhchapter516 from "../Hinhchapter/Chapter5.16.png";
import Hinhchapter517 from "../Hinhchapter/Chapter5.17.png";
import Hinhchapter518 from "../Hinhchapter/Chapter5.18.png";
import Hinhchapter519 from "../Hinhchapter/Chapter5.19.png";
import Hinhchapter520 from "../Hinhchapter/Chapter5.20.png";
import Hinhchapter521 from "../Hinhchapter/Chapter5.21.png";
import Hinhchapter52223 from "../Hinhchapter/Chapter5.2223.png";
import Hinhchapter524 from "../Hinhchapter/Chapter5.24.png";
import Hinhchapter525 from "../Hinhchapter/Chapter5.25.png";
import Hinhchapter526 from "../Hinhchapter/Chapter5.26.png";
import Hinhchapter527 from "../Hinhchapter/Chapter5.27.png";

import Congthuc1Chapter5  from "../Hinhchapter/Congthuc1Chapter5.png"
import Congthuc2Chapter5  from "../Hinhchapter/Congthuc2Chapter5.png"

import Bang1Chapter5  from "../Hinhchapter/Bang1Chapter5.png"
import Bang2Chapter5  from "../Hinhchapter/Bang2Chapter5.png"
import Bang3Chapter5  from "../Hinhchapter/Bang3Chapter5.png"
import Bang4Chapter5  from "../Hinhchapter/Bang4Chapter5.png"
import Bang5Chapter5  from "../Hinhchapter/Bang5Chapter5.png"


const { Panel } = Collapse;
function Chapter5thongtin() {
    return (
      <div id="faq" className="block faqBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>Liên Kết</h2>
          </div>
          <Collapse defaultActiveKey={['1']} size="large">
            <Panel header="I. Liên kết nội phân tử và liên kết liên phân tử" key="1" className='Panel'>
            <p>Chương này xem xét cái gì giữ vật chất lại với nhau. Các “chất keo” chịu trách nhiệm giữ các nguyên tử lại với nhau với các nguyên tử khác và phân tử với các phân tử khác được gọi là liên kết. Liên kết nội phân tử là liên kết được tìm thấy trong các phân tử. Nói cách khác, liên kết nội phân tử giữ các nguyên tử với các nguyên tử khác. Các liên kết này khác nhau tùy thuộc vào loại yếu tố tham gia vào quá trình liên kết. Liên kết liên phân tử là liên kết giữa các phân tử. Những liên kết này mang lại cho các chất những điểm nóng chảy, điểm sôi và áp suất hơi khác nhau.</p>
            <p>Các quy tắc chi phối liên kết giữa các nguyên tử và phân tử có thể khá phức tạp. Có thể đáng để xem lại các chương liên quan đến cấu trúc nguyên tử và bảng tuần hoàn/xu hướng trước khi bạn xử lý tài liệu được trình bày ở đây.</p>
            </Panel>
            <Panel header="II. Liên kết ion" key="2" className='Panel'>
            <p>Liên kết ion là liên kết rất bền được hình thành giữa cation và anion. Liên kết ion được hình thành khi một kim loại mất hoặc chuyển một electron (hoặc các electron) sang phi kim để kim loại và phi kim tạo thành các ion có mức năng lượng chính ngoài cùng đầy đủ. Do đó, các cation và anion được hình thành sẽ hút các điện tích trái dấu của nhau. Lực hút giữa các hạt tích điện trái dấu gọi là lực tĩnh điện.</p>
            <p>Phản ứng giữa Na và Cl để tạo thành NaCl cho một bức tranh rõ ràng về cách thức hoạt động của quá trình này.. Sodium có cấu hình electron là 1s²2s²2p⁶3s¹, trong khi chlorine có cấu hình 1s²2s²2p⁶3s²3p⁵. Sodium có một electron hóa trị cần được loại bỏ để đạt được octet; chlorine có bảy electron hóa trị và chỉ cần thêm một electron nữa để hoàn thành mức năng lượng chính ngoài cùng của nó. Một electron hóa trị trong natri được chuyển sang chlorine như trong Hình 5.1..</p>
            <p>Các ion sodium và chlorine bị hút bởi các điện tích trái dấu tạo thành một mạng lưới trong đó mỗi ion natri được bao quanh bởi sáu ion chlorine và sáu ion chlorine được bao quanh bởi sáu ion sodium. Mạng tinh thể chứng tỏ tại sao các hợp chất ion không tạo thành phân tử. Thay vào đó, có một mô hình liên tục các ion chlorine và sodium liên kết với nhau như trong Hình 5.2.</p>
            <img alt="Hình 5." src={Hinhchapter51} className="Hinhchapter"></img>
            <img alt="Hình 5." src={Hinhchapter52} className="Hinhchapter"></img>
            <img alt="Hình 5." src={Hinhchapter53} className="Hinhchapter"></img>
            <p>Sodium oxide minh họa một tình huống hơi khác. Ở đây sodium có một electron hóa trị và oxygen có sáu electron hóa trị. Trong trường hợp này, sẽ cần hai nguyên tử natri để nhường một electron hóa trị của mỗi nguyên tử cho oxygen. Điều này hoàn thành các octet cho cả ba nguyên tử như trong Hình 5.3.</p>
            <p>Dựa vào sơ đồ Hình 5.3, bạn có thể thấy công thức của là sodium oxide is Na<sub>2</sub>O. Không cần phải lo lắng về việc dự đoán công thức hóa học tại thời điểm này. Bây giờ bạn chỉ cần biết hai electron hóa trị đến từ đâu để cung cấp cho oxygen một octet đầy đủ.</p>
            <p><b>Vấn đề:</b></p>
            <p>Sơ đồ phản ứng xảy ra giữa calcium và oxygen để tạo thành calcium oxide.</p>
            <p><b>Giải pháp:</b> Nhận biết calcium là kim loại và oxygen là phi kim báo hiệu phản ứng sẽ chuyển electron và hợp chất tạo thành sẽ là ion. Vì calcium là kim loại nên nó sẽ nhường electron cho phi kim là oxygen. Calcium có hai electron hóa trị và oxygen có sáu. Calcium sẽ mất cả hai electron vào tay oxygen như trong Hình 5.4.</p>
            <p>Cấu hình electron của cả hai nguyên tử cũng giúp làm rõ phản ứng xảy ra (xem Hình 5.5).</p>
            <img alt="Hình 5." src={Hinhchapter54} className="Hinhchapter"></img>
            <img alt="Hình 5." src={Hinhchapter55} className="Hinhchapter"></img>
            <p>Vì chỉ cần một nguyên tử calcium và một nguyên tử oxygen để đáp ứng các octet cho cả hai nguyên tử nên công thức hóa học của calcium oxide là CaO.</p>
            </Panel>
            <Panel header="III. Liên kết cộng hóa trị" key="3" className='Panel'>
            <p>Liên kết cộng hóa trị được hình thành khi hai nguyên tử phi kim chia sẻ các electron để thỏa mãn nhu cầu có mức năng lượng chính đầy đủ ngoài cùng của chúng. Liên kết cộng hóa trị không mạnh bằng liên kết hình thành giữa các ion. Ví dụ, cần ngọn lửa cao và nhiệt độ gần 800 độ C để phá vỡ liên kết giữa sodium và chlorine trong sodium chlorine. Các liên kết cộng hóa trị được tìm thấy trong khí methane có thể bị phá vỡ ngay lập tức khi đưa que diêm vào.</p>
            <p>Chỉ nói đơn giản rằng một hợp chất có liên kết cộng hóa trị là chưa đủ vì có nhiều loại liên kết cộng hóa trị khác nhau. Một loại liên kết cộng hóa trị được gọi là liên kết cộng hóa trị không phân cực. Trong trường hợp này, sự chia sẻ electron giữa các nguyên tử là bằng nhau. Điều này xảy ra vì độ âm điện của các nguyên tử liên quan là (gần như) giống nhau. Ví dụ, khí hydro có sự chia sẻ electron bằng nhau giữa hai nguyên tử của nó:</p>
            <img src={Congthuc1Chapter5} className="math-image" alt="Math Formula"/>
            <p>Sơ đồ này cho thấy các electron hóa trị tương tác như thế nào được gọi là sơ đồ Lewis. Trong trường hợp này, cả hai nguyên tử hydro đều thỏa mãn nhu cầu có mức năng lượng chính đầy đủ ngoài cùng. Vì cả hai nguyên tử hydro đều có độ âm điện như nhau nên các nguyên tử sẽ chia sẻ số electron như nhau. Điều này sẽ xảy ra với bất kỳ phân tử hai nguyên tử nào, chẳng hạn như khí clo (xem Hình 5.6).</p>
            <p>Hãy chú ý mỗi nguyên tử clo trong Hình 5.6 có 8 electron xung quanh nó. Ngoài ra, hãy chú ý đến cặp electron dùng chung giữa hai nguyên tử.</p>
            <img alt="Hình 5." src={Hinhchapter56} className="Hinhchapter"></img>
            <p>Các electron được chia sẻ trong hợp chất cộng hóa trị</p>
            <p>Vì các nguyên tử hydro và clo có chung một cặp electron nên hai “dấu chấm” có thể được thay thế bằng “dấu gạch ngang” để biểu thị rằng một liên kết đã được tạo ra. Biểu đồ chấm hóa trị có thể được viết lại thành: H—H và Cl—Cl. Liên kết được biểu thị bằng “dấu gạch ngang” được gọi là liên kết đơn vì có một cặp electron dùng chung giữa hai nguyên tử.</p>
            <p>Cấu trúc của nitrogen diatomic lại kể một câu chuyện khác. Khi bạn đặt hai nguyên tử nitơ cạnh nhau, bạn sẽ thấy rằng mỗi nguyên tử có ba electron độc thân muốn ghép đôi như trong Hình 5.7.</p>
            <p>Hai nguyên tử nitơ chia sẻ sáu electron hoặc ba cặp electron. Điều này có nghĩa là có ba liên kết giữa hai nguyên tử nitơ, N ≡ N. Đây được gọi là liên kết ba.</p>
            <p>Trường hợp còn lại cần được xem xét là trường hợp liên quan đến liên kết đôi. Carbon dioxide có hai liên kết đôi hình thành như trong Hình 5.8.</p>
            <p>Các liên kết được tìm thấy giữa carbon và oxy đặt ra một vấn đề mới liên quan đến liên kết. Vì độ âm điện của carbon và oxygen khác nhau (chúng khác nhau từ 0,5 đến 1,7) nên liên kết được gọi là liên kết cộng hóa trị có cực. Liên kết cộng hóa trị có cực được đặc trưng bởi các nguyên tử có sự chia sẻ electron không đồng đều. Bởi vì các electron tích điện âm dành nhiều thời gian hơn cho các electron có độ âm điện lớn hơn</p>
            <img alt="Hình 5." src={Hinhchapter57} className="Hinhchapter"></img>
            <img alt="Hình 5." src={Hinhchapter58} className="Hinhchapter"></img>
            <p>nguyên tố, có độ âm điện lớn hơn sẽ mang điện tích âm nên gọi là độ âm điện. Hydro clorua có liên kết cộng hóa trị có cực giữa nguyên tử hydro và clo. Sự tích tụ điện tích âm trên clo có độ âm điện lớn hơn có thể được biểu diễn bằng cách sử dụng mũi tên lưỡng cực như trên Hình 5.9.</p>
            <img alt="Hình 5." src={Hinhchapter59} className="Hinhchapter"></img>
            <p>Bởi vì nguyên tử hydrogen nhìn thấy các electron của nó bị thu hút bởi nguyên tử chlorine, nên nguyên tử hydro mang điện tích dương vì một điện tích âm của nó dành nhiều thời gian hơn cho chlorine.</p>
            <p><b>Vấn đề:</b></p>
            <p>Vẽ công thức Lewis của formaldehyde, CH₂O. Những liên kết nào sẽ là cộng hóa trị có cực? cộng hóa trị không phân cực?</p>
            <p><b>Giải pháp:</b> Bởi vì carbon có số lượng electron hóa trị đơn lớn nhất nên nó sẽ là nguyên tử được đặt ở giữa phân tử. Hai nguyên tử hydro sẽ tạo liên kết đơn với nguyên tử carbon như trong Hình 5.10.</p>
            <p>Hai electron chưa ghép cặp còn lại trên nguyên tử carbon sẽ liên kết với hai electron chưa ghép cặp xung quanh nguyên tử oxy như trên Hình 5.11.</p>
            <p>Cấu trúc cuối cùng được thể hiện trong hình 5.12. Bởi vì có rất ít sự khác biệt giữa độ âm điện giữa hydrogen và carbon nên liên kết giữa hai chất này là cộng hóa trị không phân cực. Bởi vì sự chênh lệch độ âm điện giữa oxygen và carbon lớn hơn nên liên kết giữa hai nguyên tử sẽ là cộng hóa trị có cực. Nói chung, một liên kết là cộng hóa trị không phân cực nếu hiệu độ âm điện giữa các nguyên tử là từ 0 đến 0,4. Nếu chênh lệch từ 0,5 đến 1,7 thì liên kết là liên kết cộng hóa trị có cực</p>
            <img alt="Hình 5." src={Hinhchapter5101112} className="Hinhchapter"></img>
            </Panel>
            <Panel header="IV. Liên kết Sigma và liên kết Pi" key="4" className='Panel'> 
            <p>Sự hình thành liên kết đơn, đôi và ba trong phân tử phụ thuộc vào loại quỹ đạo lai đang chia sẻ electron. Ví dụ, khi hai nguyên tử hydrogen liên kết tạo thành H2(g), có sự chồng chéo của các quỹ đạo s như trong Hình 5.13.</p>
            <img alt="Hình 5." src={Hinhchapter513} className="Hinhchapter"></img>
            <p>Sự chồng chéo này cho phép các nguyên tử hydrogen tạo thành một liên kết đơn. Liên kết đầu tiên hình thành giữa hai nguyên tử được gọi là liên kết sigma (σ). Liên kết sigma phát sinh từ sự chồng chéo của hai quỹ đạo s hoặc từ sự chồng chéo của một quỹ đạo s và một quỹ đạo p, hoặc từ sự chồng chéo của hai quỹ đạo p. Các liên kết trong phân tử metan (Hình 5.14) là một ví dụ về tình huống trong đó các quỹ đạo p lai trùng với quỹ đạo s.</p>
            <p>Liên kết pi là liên kết thứ hai được hình thành khi hai nguyên tử lai hóa sp² có quỹ đạo chồng lên nhau. Liên kết đầu tiên được hình thành là sự kết hợp của hai obitan lai hóa sp2. Liên kết thứ hai được hình thành, liên kết pi, là kết quả của các quỹ đạo p trên trục y chồng lên nhau khi các nguyên tử đến đủ gần để làm như vậy. Vì các quỹ đạo p nằm trên trục y cần phải đủ gần để liên kết nên liên kết đôi ngắn hơn liên kết đơn. Tuy nhiên, liên kết đôi mạnh hơn liên kết đơn. Sự chồng chéo được thể hiện trong Hình 5.15.</p>
            <img alt="Hình 5." src={Hinhchapter514} className="Hinhchapter"></img>
            <img alt="Hình 5." src={Hinhchapter515} className="Hinhchapter"></img>
            <img alt="Hình 5." src={Hinhchapter516} className="Hinhchapter"></img>
            <p>Cuối cùng, xảy ra trường hợp lai hóa sp3 và hình thành liên kết pi thứ hai. Liên kết pi thứ hai là kết quả của sự chồng chéo của các quỹ đạo p trên trục z. Vì liên kết sigma được hình thành ở trục x và hai liên kết pi được hình thành ở trục y và z nên liên kết ba được hình thành. Liên kết ba sẽ ngắn hơn liên kết đôi và liên kết ba cũng bền hơn liên kết đôi. (Xem Hình 5.16.).</p>
            </Panel>
            <Panel header="V. Liên kết trong mạng tinh thể, liên kết cộng giá trị và loại kim liên kết" key="5" className='Panel'>
            <p>Có một loại liên kết cộng hóa trị quan trọng khác ngoài liên kết cộng hóa trị không phân cực và có cực vừa được thảo luận. Một ví dụ được thể hiện trong Hình 5.17.</p>
            <p>Trong ví dụ này, cặp electron tự do nằm trên nguyên tử nitơ nhường hai electron cho liên kết được hình thành với ion hydro. Thông thường khi liên kết cộng hóa trị được hình thành, mỗi nguyên tử liên kết sẽ có một electron. Trong trường hợp này, ion hydro không nhường bất kỳ electron nào cho liên kết này. Khi một nguyên tử nhường cả hai electron trong liên kết cộng hóa trị, liên kết được gọi là liên kết cộng hóa trị tọa độ.</p>
            <p>Nước cung cấp một ví dụ khác về liên kết cộng hóa trị tọa độ như trong Hình 5.18.</p>
            <p>Trong mọi ví dụ cho đến nay, các liên kết cộng hóa trị đã giữ các nguyên tử lại với nhau để tạo ra các phân tử. Tuy nhiên, tồn tại những chất như kim cương và than chì trong đó các nguyên tử carbon liên kết cộng hóa trị nhưng không liên kết để tạo thành phân tử. Những trường hợp như vậy được gọi là chất rắn mạng; các nguyên tử liên kết với nhau thành một mạng lưới liên tục. Mạng lưới lớn mang lại cho các chất rắn này độ nóng chảy rất cao</p>
            <img alt="Bảng 5" src={Bang1Chapter5} className="Bangchapter"></img>
            <img alt="Hình 5." src={Hinhchapter517} className="Hinhchapter"></img>
            <img alt="Hình 5." src={Hinhchapter518} className="Hinhchapter"></img>
            <p>điểm. Cũng lưu ý rằng vì cả kim cương và than chì đều được tạo thành từ cùng một nguyên tố và là những chất khác nhau nên chúng được dán nhãn là dạng thù hình của nhau.</p>
            <p>Cuối cùng, có liên kết kim loại xảy ra giữa các kim loại. Các nguyên tử kim loại giữ các electron của chúng rất lỏng lẻo, đó là lý do tại sao kim loại dẫn điện rất tốt. Các electron liên kết lỏng lẻo thường được gọi là “biển electron”. Các vòng tròn tối hơn trong Hình 5.19 tượng trưng cho các đám mây điện tử của nguyên tử kim loại.</p>
            <img alt="Hình 5." src={Hinhchapter519} className="Hinhchapter"></img>
            <p><b>Vấn đề:</b></p>
            <p>Kể tên loại liên kết giữa các nguyên tử trong KCl, H₃O⁺, CCl₄, SiO₂, Fe(s), F₂, và HBr.</p>
            <p><b>Giải pháp:</b> KCl có ion kim loại và ion phi kim hút nhau nên sẽ là ion. H₃O⁺ có liên kết cộng hóa trị có cực và một liên kết cộng hóa trị tọa độ. Liên kết giữa C và Cl sẽ là liên kết cộng hóa trị có cực do sự khác biệt về độ âm điện. SiO2 là cát và là chất rắn có mạng lưới. Một mẫu sắt sẽ có liên kết kim loại vì chỉ có nguyên tử kim loại. Fluorine là chất lưỡng nguyên tử và sẽ có liên kết cộng hóa trị không phân cực. HBr sẽ có liên kết cộng hóa trị có cực vì sự khác biệt lớn về độ âm điện giữa hai phi kim này.</p>
            </Panel>
            <Panel header="VI. Lực lưỡng cực và tính phân cực của phân tử" key="6" className='Panel'>
            <p>Bởi vì các liên kết có thể có cực và các phân tử có thể có những hình dạng nhất định, nên các electron có thể “xây dựng” trên một mặt của phân tử và làm cho một đầu mang điện tích âm nhẹ. Khi một phân tử có kiểu “tích tụ” điện tích âm ở một bên và điện tích dương ở một bên khác, thì phân tử đó được gọi là lưỡng cực. Đây là trường hợp của HCl như trong Hình 5.20.</p>
            <img alt="Hình 5." src={Hinhchapter520} className="Hinhchapter"></img>
            <p>Trong phân tử HCl, không chỉ các liên kết cộng hóa trị có cực mà còn do các electron dành nhiều thời gian với clo hơn so với hydrogen nên đầu clo của phân tử mang điện tích âm. HCl là một phân tử lưỡng cực hoặc phân cực vì sự khác biệt về độ âm điện đã tạo ra “hai cực”. Nhắc đến mũi tên lưỡng cực, không có sự cân bằng điện tích trong phân tử này và nó được phân loại là có cực.</p>
            <p>Tình trạng tương tự cũng xảy ra với nước. Trong phân tử nước, liên kết là cộng hóa trị có cực do sự chênh lệch lớn về độ âm điện giữa hydrogen và oxygen. Do hình dạng phân tử bị uốn cong của phân tử nước nên các mũi tên lưỡng cực không thể đối trọng. Có một mômen lưỡng cực tổng thể trong phân tử như trong Hình 5.21.</p>
            <img alt="Hình 5." src={Hinhchapter521} className="Hinhchapter"></img>
            <p>Xem xét lại hình dạng và các liên kết phân cực được tìm thấy trong amoniac cho thấy tình trạng tương tự như nước. Bởi vì không có sự đối xứng trong phân tử amoniac nên không có sự cân bằng lực và có một mômen lưỡng cực tổng thể trong phân tử ammonia như trong Hình 5.22.</p>
            <p>Carbon dioxide và carbon tetrachloride kể một câu chuyện khác về liên kết cực và mômen lưỡng cực tổng thể. Cả carbon dioxide và carbon tetrachloride đều có liên kết phân cực, như được biểu diễn bằng các mũi tên lưỡng cực trong Hình 5.23.</p>
            <img alt="Hình 5." src={Hinhchapter52223} className="Hinhchapter"></img>
            <p>Trong hai trường hợp này, các mũi tên lưỡng cực triệt tiêu lẫn nhau do hình dạng của các phân tử. Hình dạng tuyến tính của phân tử carbon dioxide đặt các mũi tên lưỡng cực theo hướng ngược nhau để đối trọng với nhau. Điều tương tự cũng đúng đối với dạng hình học phân tử tứ diện được tìm thấy trong carbon tetraclorua. Mặc dù có liên kết cực nhưng hai phân tử này không phân cực. Không có mômen lưỡng cực tổng thể trong các phân tử này vì các mũi tên lưỡng cực có cùng độ lớn nhưng nằm ngược chiều nhau trong phân tử. Sự đối trọng này làm cho phân tử không phân cực.</p>
           </Panel>
            <Panel header="VII. Cấu trúc cộng hưởng" key="7" className='Panel'>
            <p>Cấu trúc cộng hưởng hình thành khi một chất có các electron định vị có thể dịch chuyển bên trong chất đó. Điều này cho phép vẽ nhiều Cấu trúc Lewis. Một số ví dụ lànitrate ion, ozone, và ion carbonate như dưới đây.</p>
            <img src={Congthuc2Chapter5} className="math-image" alt="Math Formula"/>
            </Panel>
            <Panel header="VIII. Lý thuyết VSEPR" key="8" className='Panel'>
            <p>Lý thuyết VSEPR có thể giải thích vị trí của các electron xung quanh nguyên tử trung tâm của phân tử và hình dạng của phân tử khi nó có một số lượng nguyên tử nhất định liên kết với nguyên tử trung tâm. Điều này có thể được tóm tắt bằng biểu đồ sau:</p>
            <img alt="Bảng 5" src={Bang2Chapter5} className="Bangchapter"></img>
            </Panel>
            <Panel header="IX. Liên kết Hydrogen" key="9" className='Panel'>
            <p>Liên kết hydro là một lực yếu xuất hiện khi hydrogen liên kết với fluorine, oxygen hoặc nitrogen. Một phương pháp ghi nhớ tốt có thể sử dụng là “Chúng tôi đã nghe nói về liên kết hydrogen trên FON (điện thoại)”. Khi hydrogen liên kết với fluorine, oxygen hoặc nitrogen, hydrogen sẽ tạo thành liên kết hydrogen yếu với nguyên tử fluorine, oxygen hoặc nitrogen lân cận. Đường đứt nét trong Hình 5.24 cho thấy các liên kết hydrogen được hình thành giữa các nguyên tử hydrogen và oxygen trong nước.</p>
            <p>Một ứng dụng quan trọng của liên kết hydrogen nằm trong mã di truyền của chúng ta – DNA. Trong một phân tử DNA, hai sợi được giữ cạnh nhau ở các nitrogen base. Đó là liên kết hydrogen giữ nitrogen base của một sợi với nitrogen base của sợi thứ hai. Liên kết hydrogen đủ mạnh ở dạng</p>
            <img alt="Hình 5." src={Hinhchapter524} className="Hinhchapter"></img>
            <p>số lượng lớn hơn để giữ các sợi cạnh nhau và giúp DNA tạo ra cấu trúc xoắn kép. Tuy nhiên, khi DNA sao chép, các liên kết hydro đủ yếu để bị phá vỡ nên mỗi chuỗi có thể được sao chép riêng lẻ. (Xem Hình 5.25.)</p>
            <img alt="Hình 5." src={Hinhchapter525} className="Hinhchapter"></img>
            <p>Liên kết hydro cũng là nguyên nhân khiến nước có nhiệt độ sôi cao bất thường. Các phân tử nặng hơn như H2S, không có liên kết hydrogen, nên có nhiệt độ sôi cao hơn phân tử nước nhẹ hơn nhiều. Nhưng mặc dù nhẹ hơn nhưng nước có nhiệt độ sôi cao hơn vì nó có liên kết hydrogen còn hydrogen sulfide thì không. (Xem Hình 5.26.)</p>
            <img alt="Hình 5." src={Hinhchapter526} className="Hinhchapter"></img>

            </Panel>
            <Panel header="X. Lực Van der Waals (London Dispersion) " key="10" className='Panel'>
            <p>Mặc dù các phân tử không phân cực được cho là không có bất kỳ lực hút nào giữa chúng, nhưng vẫn tồn tại một lực hút tạm thời rất yếu gọi là lực Van der Waals. Bạn cũng sẽ thường nghe thấy lực này được gọi là lực phân tán. Lực này là lực tạm thời xuất phát từ khả năng các electron chuyển động ngẫu nhiên và tạo ra một điện tích không đều xung quanh điểm.</p>
            <img alt="Bảng 5" src={Bang3Chapter5} className="Bangchapter"></img>
            <p>Khi khối lượng nguyên tử tăng thì lực Van der Waals giữa phân tử. Điều này làm cho các phân tử được giữ chặt hơn khi khối lượng nguyên tử tăng lên. Iốt, nặng nhất trong số các halogen được liệt kê, có khối lượng lớn nhất và lực Van der Waals lớn nhất và tồn tại dưới dạng chất rắn.</p>
            <p><b>Vấn đề:</b></p>
            <p>Trong số ba chất không phân cực này là C₈H₁₈, C₂₀H₄₂ và CH₄, một chất là chất rắn, một chất là chất lỏng và một là chất khí ở STP. Cái nào là cái nào?</p>
            <p><b>Giải pháp:</b> C₂₀H₄₂ có khối lượng lớn nhất trong ba loại được cho là chất rắn. CH₄ có khối lượng nhẹ nhất trong ba loại và được cho là ở dạng khí. C₈H₁₈ bằng quá trình loại bỏ là chất lỏng. Nói cho dễ hiểu thì C₈H₁₈ được gọi là octan và nó là chất lỏng đi vào bình xăng của ô tô. C20H42 được gọi là sáp và tồn tại dưới dạng chất rắn. CH4 là khí metan.</p>
            </Panel>
            <Panel header="XI. Lực hút phân tử-ion" key="11" className='Panel'>
            <p>Khi muối được cho vào nước, chúng sẽ hòa tan (một số muối nhiều hơn những muối khác) và tạo thành các ion. Sau khi muối hòa tan được hòa tan trong nước, sẽ có lực hút giữa các ion tích điện và các phân tử nước có cực. Đây được gọi là lực hút phân tử-ion. Do lực hút này, các ion ngậm nước trong dung dịch làm cho các phân tử nước tự định hướng theo một kiểu cụ thể. Phần oxygen của phân tử nước có điện tích âm vì độ âm điện cao. Phần âm này của phân tử nước sẽ bị thu hút bởi các cation trong dung dịch. Vì các nguyên tử hydrogen trong nước mang điện tích dương nhẹ nên chúng sẽ tự định hướng về phía các anion trong dung dịch. Đó là trường hợp NaCl hòa tan trong nước như hình 5.27.</p>
            <img alt="Hình 5." src={Hinhchapter527} className="Hinhchapter"></img>
            <p><b>Vấn đề:</b></p>
            <p>Loại liên kết nào được tìm thấy giữa các phân tử và nguyên tử sau đây: F₂(g), Ne(g), KBr(aq), H₂O(l), NH3(l), và CH₄(g)?</p>
            <p><b>Giải pháp:</b> Khí fluorine là khí không phân cực và sẽ chịu lực Van der Waals. Ne là khí hiếm và cũng chịu tác dụng của lực Van der Waals. KBr(aq) là một hợp chất ion hòa tan trong nước. Lực hút giữa các ion và phân tử nước là lực phân tử-ion. Các phân tử nước và ammonia sẽ chịu cả lực lưỡng cực và liên kết hydrogen. Cuối cùng, vì khí methane là khí không phân cực nên sẽ chịu lực Van der Waals giữa các phân tử.</p>
            <p>Biểu đồ này cung cấp một bản tóm tắt hữu ích về liên kết giữa các phân tử</p>
            <img alt="Bảng 5" src={Bang4Chapter5} className="Bangchapter"></img>
            </Panel>
            <Panel header="XII. Lực hút phân tử-ion" key="12" className='Panel'>
            <p>Khả năng gọi tên các hợp chất và xác định công thức hóa học của một hợp chất xuất phát từ khả năng phân biệt giữa các hợp chất ion và cộng hóa trị. Tên của một hợp chất phụ thuộc rất nhiều vào loại liên kết giữa các nguyên tử. Ngoài việc có thể nhận biết một số loại liên kết nhất định, khi học cách gọi tên các hợp chất, tốt nhất bạn nên nhớ các quy tắc áp dụng cho loại liên kết đó. Quy tắc đặt tên cho 4 loại hợp chất thông dụng được nêu dưới đây.</p>
            <img alt="Bảng 5" src={Bang5Chapter5} className="Bangchapter"></img>
            <p><b>Vấn đề:</b></p>
            <p>Đặt tên sau đây: S<sup>2−</sup>, N<sup>3−</sup>, CaF₂, K₂S, NaOH, Na₂SO₄, SO₃ và CCl₄.</p>
            <p><b>Giải pháp:</b> Hai ion đầu tiên là các anion nguyên tử đơn và được gọi là sulfide và nitride. Hai chất tiếp theo là các hợp chất ion nhị phân, calcium fluoride và potassium sunfide. Các ion hydroxide đa nguyên tử và sunfate có trong sodium hydroxide và sodium sunfate. Cuối cùng, hai hợp chất cuối cùng được liên kết cộng hóa trị và được gọi là sulfur trioxide và carbon tetrachlorine.</p>
            
            </Panel>
            <Panel header="XIII. Xác định công thức hóa học" key="13" className='Panel'>
            <p>Chương này đã xem xét những cách khác nhau để các nguyên tử liên kết với nhau. Đối với một số vấn đề nhất định, cần lưu ý rằng cần có nhiều hơn một nguyên tử của một nguyên tố để giúp hoàn thành octet của nguyên tố khác. Việc xác định công thức hóa học của một hợp chất bằng cách kết hợp cấu trúc Lewis là một phương pháp tẻ nhạt và tốn nhiều công sức. Phương pháp chéo là phương pháp nhanh hơn để sử dụng với điều kiện là bạn hiểu cách tìm điện tích của một ion. Với phương pháp chéo, số trong điện tích của một phần tử sẽ trở thành số trong chỉ số của phần tử kia. Đây là cách nó hoạt động trong việc xác định công thức hóa học của magnesium chlorine. Đầu tiên, xác định điện tích của các ion có trong Mg<sup>2+</sup> và Cl<sup>−</sup>. Thứ hai, hoán đổi các số trong điện tích ion để chúng trở thành chỉ số dưới như trong Hình 5.28.</p>
            <p>Cuối cùng, sử dụng tỷ lệ chỉ số thấp nhất nếu hợp chất là ion, MgCl₂.</p>
            <p>Phương pháp chéo cũng áp dụng được cho các hợp chất chứa ion đa nguyên tử. Tuy nhiên, cần lưu ý một điều: khi có nhiều đơn vị ion đa nguyên tử, bạn phải sử dụng dấu ngoặc đơn để chỉ ra điều này. Sử dụng lưu ý thận trọng này, bạn có thể xác định công thức hóa học của canxi photphat. Canxi, kim loại nhóm 2, sẽ mang điện tích 2+ và sử dụng bảng tham chiếu, bạn sẽ thấy rằng phốt phát có điện tích 3+. Vậy bạn có Ca<sup>2+</sup> và PO₄<sup>3−</sup>. Tiếp theo, xếp chéo các số trong điện tích như trong Hình 5.29.</p>
            <p>Lưu ý rằng các khoản phí không còn được viết trong công thức nữa. Ngoài ra, hãy lưu ý các dấu ngoặc đơn được sử dụng xung quanh ion phosơhate đa nguyên tử.</p>
            <p><b>Vấn đề:</b></p>
            <p>Hãy cho biết công thức hóa học của ammonium sulfate và potassium dichromate.</p>
            <p><b>Giải pháp:</b> ion Ammonium NH<sup>4+</sup> và ion sulfate SO₄<sup>2−</sup> chéo nhau để trở thành (NH₄)₂SO₄. Một lần nữa, người ta nhấn mạnh vào việc sử dụng dấu ngoặc đơn. Potassium tạo thành ion 1+ và dichromate là Cr₂O₇<sup>2−</sup>. Sau khi sử dụng phương pháp chéo, công thức sẽ trở thành K₂Cr₂O₇.</p>

            </Panel>
            <Panel header="XIV. Phương pháp Stock" key="14" className='Panel'>
            <p>Phương pháp đặt tên gốc các hợp chất giúp làm rõ tên các hợp chất có chứa các nguyên tố chuyển tiếp. Ví dụ: có hai loại clorua sắt là FeCl₂ và FeCl₃. Làm thế nào bạn có thể phân biệt cái này với cái kia? Trong FeCl₂, sắt có điện tích ion là 2+, trong khi ở FeCl₃, sắt có điện tích ion là 3+. Chữ số La Mã trong ngoặc đơn biểu thị điện tích có trên cation. Vì vậy, FeCl2 được gọi là iron(II) chloridevà FeCl₃ được gọi là iron(III) chloride. Sau khi thấy điện tích của cation, bạn có thể áp dụng các quy tắc cho phương pháp chéo.</p>          
            <p><b>Vấn đề:</b></p>
            <p>Công thức hóa học của tin(IV) fluoride và lead(IV) oxide?</p>
            <p><b>Giải pháp:</b> Sử dụng phương pháp chéo, tin(IV) fluoride sẽ là SnF₄. Khi sử dụng phương pháp chéo cho lead(IV) oxide, ban đầu công thức sẽ giống Pb2O4 nhưng hãy nhớ rằng tất cả các hợp chất ion đều được viết ở tỷ lệ thấp nhất, công thức thực là PbO₂.</p>
            </Panel>
          </Collapse>
        </div>
      </div>  
    );
  }

export default Chapter5thongtin;