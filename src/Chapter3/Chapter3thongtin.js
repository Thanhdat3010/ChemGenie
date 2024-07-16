import React from 'react';
import { Collapse} from 'antd';
import "./Chapter3thongtin.css"
import Hinhchapter31 from "../Hinhchapter/Chapter3.1.png";
import Hinhchapter32 from "../Hinhchapter/Chapter3.2.png";
import Hinhchapter33 from "../Hinhchapter/Chapter3.3.png";
import Hinhchapter34 from "../Hinhchapter/Chapter3.4.png";
import Hinhchapter35 from "../Hinhchapter/Chapter3.5.png";
import Hinhchapter36 from "../Hinhchapter/Chapter3.6.png";
import Hinhchapter37 from "../Hinhchapter/Chapter3.7.png";
import Hinhchapter38 from "../Hinhchapter/Chapter3.8.png";
import Hinhchapter39 from "../Hinhchapter/Chapter3.9.png";
import Hinhchapter310 from "../Hinhchapter/Chapter3.10.png";
import Hinhchapter311 from "../Hinhchapter/Chapter3.11.png";
import Hinhchapter312 from "../Hinhchapter/Chapter3.12.png";
import Hinhchapter313 from "../Hinhchapter/Chapter3.13.png";
import Congthuc1Chapter3  from "../Hinhchapter/Congthuc1Chapter3.png"
import Congthuc2Chapter3  from "../Hinhchapter/Congthuc2Chapter3.png"
import Congthuc3Chapter3  from "../Hinhchapter/Congthuc3Chapter3.png"
import Congthuc4Chapter3  from "../Hinhchapter/Congthuc4Chapter3.png"
import Congthuc5Chapter3  from "../Hinhchapter/Congthuc5Chapter3.png"
import Congthuc6Chapter3  from "../Hinhchapter/Congthuc6Chapter3.png"
import Congthuc7Chapter3  from "../Hinhchapter/Congthuc7Chapter3.png"
import Congthuc8Chapter3  from "../Hinhchapter/Congthuc8Chapter3.png"
import Congthuc9Chapter3  from "../Hinhchapter/Congthuc9Chapter3.png"
import Congthuc10Chapter3  from "../Hinhchapter/Congthuc10Chapter3.png"
import Bang1Chapter3  from "../Hinhchapter/Bang1Chapter3.png"
import Bang2Chapter3  from "../Hinhchapter/Bang2Chapter3.png"
import Bang3Chapter3  from "../Hinhchapter/Bang3Chapter3.png"
const { Panel } = Collapse;
function Chapter3thongtin() {
    return (
      <div id="faq" className="block faqBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>CẤU TRÚC NGUYÊN TỬ</h2>
          </div>
          <Collapse defaultActiveKey={['1']} size="large">
            <Panel header="I. Tóm tắt lịch sử của nguyên tử" key="1" className='Panel'>
            <p>Ý tưởng của chúng ta về nguyên tử đã đi được một chặng đường dài trong vài nghìn năm qua. Ý tưởng ban đầu của người Hy Lạp về các chất là mọi thứ đều được tạo thành từ đất, gió, lửa hoặc nước. Ý tưởng về một hạt không thể phân chia được xuất hiện sau đó, và từ “nguyên tử” bắt nguồn từ từ “atomos” trong tiếng Hy Lạp, có nghĩa là “không thể phân chia”.</p>
            <p>Vào đầu những năm 1800, John Dalton đã xây dựng Lý thuyết nguyên tử của mình, có thể tóm tắt như sau:</p>
            <p>•&nbsp;Mọi vật chất đều được cấu tạo từ các nguyên tử.</p>
            <p>•&nbsp;Tất cả các nguyên tử của một nguyên tố nhất định đều giống nhau (tuy nhiên, trong Chương 3 điều này sẽ bị tranh cãi).</p>
            <p>•&nbsp;Hợp chất được tạo thành từ các nguyên tử kết hợp theo tỷ lệ cố định.</p>
            <p>•&nbsp;Phản ứng hóa học liên quan đến sự sắp xếp lại các nguyên tử. Các nguyên tử không được tạo ra hoặc bị phá hủy trong phản ứng hóa học.</p>
            <p>Vào đầu những năm 1900, một nhà khoa học tên Robert Millikan đã thực hiện một thí nghiệm sử dụng những giọt dầu mang điện tích. Mặc dù các chi tiết của thí nghiệm có thể khá rộng rãi, nhưng về cơ bản các giọt nước được phép rơi qua một điện trường với một tốc độ nhất định. Từ thí nghiệm này, Millikan đã có thể xác định được khối lượng và điện tích của các electron trên giọt dầu.</p>            
            <p>Cũng vào đầu những năm 1900, Ernest Rutherford đã thực hiện Thí nghiệm lá vàng nổi tiếng của mình. Rutherford đã thiết lập một thí nghiệm trong đó một chất phóng xạ giải phóng các hạt alpha. Những hạt này nhắm vào một tấm lá vàng mỏng. Một màn phủ kẽm sunfua được đặt xung quanh lá vàng để phát hiện các hạt alpha khi chúng chạm vào màn hình. Thí nghiệm của Rutherford cho thấy rằng trong khi một số hạt alpha bị lệch và bật trở lại, phần lớn các hạt alpha có thể đi xuyên qua lá vàng. Điều này được thể hiện trong Hình 3.1.</p>
            <p>Câu hỏi tiếp theo cần trả lời là: Tại sao điều này có thể xảy ra? Làm thế nào một hạt alpha, một hạt có khối lượng, có thể đi xuyên qua lá vàng, một chất khác có khối lượng? Vì vàng được rèn thành một tấm mỏng (một số người cho rằng dày khoảng 100 nguyên tử) nên nhiều hạt alpha có thể đi qua lá vàng. Tuy nhiên, không phải mọi hạt alpha đều có thể đi qua và một số bị bật trở lại nguồn bức xạ. Rutherford đã rút ra kết luận sau từ thí nghiệm này: </p>
            <p>•&nbsp;Nguyên tử chủ yếu là không gian trống rỗng. (Kết luận này thường được gọi là “khái niệm không gian trống rỗng.”)</p>
            <p>•&nbsp;Kích thước hạt nhân nguyên tử nhỏ so với kích thước của toàn bộ nguyên tử.</p>
            <p>•&nbsp;Khối lượng nguyên tử tập trung ở hạt nhân nguyên tử.</p>
            <p>•&nbsp;Hạt nhân mang điện tích dương.</p>
            <img alt="Hình 3.1" src={Hinhchapter31} className="Hinhchapter"></img>
            </Panel>
            <Panel header="II. Các hạt hạ nguyên tử" key="2" className='Panel'>
            <p>Người ta hiểu rõ hơn về cấu trúc của nguyên tử nhờ những thí nghiệm bổ sung vào đầu những năm 1900. Việc phát hiện ra các hạt hạ nguyên tử là một bước đột phá lớn trong cấu trúc nguyên tử. Những hạt này được phân loại là electron và nucleon. Các nucleon sau đó được phát hiện là neutron và proton. Tính chất của các hạt này có thể được so sánh cạnh nhau:</p>            
            <img alt="Bảng 1" src={Bang1Chapter3} className="Bangchapter"></img>
            <p>Điều này chỉ tóm tắt những điều cơ bản nhất của cấu trúc nguyên tử. Thời gian trôi qua, nhiều điều về cấu trúc của nguyên tử đã được tiết lộ.</p>
            </Panel>
            <Panel header="III. Đồng vị" key="3" className='Panel'>
            <p>Bạn thường gặp biểu tượng của một phần tử được viết bằng một vài con số. Những con số này nói lên khá nhiều điều về hạt nhân của nguyên tố được đề cập. Nhìn vào ví dụ phổ biến này:
            <img src={Congthuc1Chapter3} className="math-image" alt="Math Formula"/>
            </p>
            <p>Số 12, được hiển thị dưới dạng chỉ số trên, được gọi là số khối của nguyên tố. Số khối là tổng số proton và neutron có trong hạt nhân nguyên tử. Hãy nhớ lại thí nghiệm của Rutherford rằng hạt nhân chứa khối lượng của nguyên tử. Vì proton và neutron là các hạt trong hạt nhân nguyên tử nên chúng tạo nên khối lượng của nguyên tử vì khối lượng của electron là rất nhỏ khi so sánh. Số 6, được hiển thị dưới dạng chỉ số dưới, được gọi là số nguyên tử. Điều này có thể được định nghĩa là số lượng proton trong hạt nhân, điện tích hạt nhân (proton là hạt nhân duy nhất có điện tích) hoặc số lượng electron trong một nguyên tử trung tính. Có bao nhiêu neutron trong carbon-12? Để tìm số neutron trong nguyên tử, hãy trừ số nguyên tử khỏi số khối. Trong trường hợp này có 6 neutron trong nguyên tử này.</p>
            <p>Tồn tại các nguyên tử cacbon khác với số khối khác nhau: carbon-13 và carbon-14. Đây là sự so sánh của các nguyên tử carbon này:</p>
            <img alt="Bảng 2" src={Bang2Chapter3} className="Bangchapter"></img>
            <p>Lưu ý rằng có điều gì đó khác biệt ở hạt nhân của các nguyên tử carbon này. Những nguyên tử này là đồng vị của nhau. Những điểm tương đồng và khác biệt được trình bày dưới đây:</p>
            <p>Các đồng vị có giống nhau:</p>
            <p>•&nbsp;Số nguyên tử</p>
            <p>•&nbsp;Số lượng proton</p>
            <p>•&nbsp;Tên của phần tử</p>
            <p>Các đồng vị có sự khác biệt:</p>
            <p>•&nbsp;Số neutron</p>
            <p>•&nbsp;Số khối</p>
            <p>Đồng vị có thể giúp xác định khối lượng nguyên tử (không phải số khối) của một nguyên tố. Khối lượng nguyên tử của một nguyên tố có thể được tìm thấy trên bảng tuần hoàn. Khối lượng nguyên tử là một số có chứa chữ số thập phân. Tại sao? Có thể có một phần proton hoặc neutron không? Khối lượng nguyên tử không phải là số nguyên vì khối lượng nguyên tử tính đến tất cả khối lượng của các đồng vị của nguyên tử và độ phổ biến tương đối của chúng. Ví dụ, brom có hai đồng vị là bromine-79 và bromine-81. Người ta đã phát hiện ra rằng 50% tổng số nguyên tử brom là bromine-79 và 50% là bromine-81. Từ đó bạn có thể tính được tại sao khối lượng nguyên tử của bromine là 80:
            <img src={Congthuc2Chapter3} className="math-image" alt="Math Formula"/>
            </p>
            <p><b>Vấn đề:</b></p>
            <p>Chlorine có hai đồng vị: 75% tổng số nguyên tử chlorine là chlorine-35 và 25% là chlorine-37. Có bao nhiêu neutron trong các đồng vị này? Khối lượng nguyên tử của chlorine là gì?</p>
            <p><b>Giải pháp:</b> Cả hai đồng vị của chlorine đều có 17 proton. Chlorine-35 sẽ có 18 neutron để tạo ra tổng số khối là 35. Chlorine-37 sẽ có 20 neutron để tạo ra tổng số khối là 37. Nhân khối lượng của hai đồng vị với độ phổ biến tương đối của chúng:</p>
            <img src={Congthuc3Chapter3} className="math-image" alt="Math Formula"/>
            <p>Kiểm tra bảng tuần hoàn ở chương 3 cho thấy khối lượng này gần với khối lượng đã nêu của chlorine, 35.45.</p>
            </Panel>
            <Panel header="IV. Mô hình Bohr của nguyên tử" key="4" className='Panel'> 
            <p>Niels Bohr đề xuất một mô hình nguyên tử trong đó các electron chuyển động quanh hạt nhân theo những quỹ đạo cố định. Trong mô hình này, mỗi quỹ đạo cách hạt nhân một khoảng cố định và mỗi electron
            <img alt="Hình 3.2" src={Hinhchapter32} className="Hinhchapter"></img>
            trong các quỹ đạo này đều có một lượng năng lượng nhất định. Các electron phải ở một trong các quỹ đạo; họ không thể ở giữa. Các electron năng lượng thấp quay gần hạt nhân hơn trong khi các electron năng lượng cao hơn quay xa hạt nhân hơn. Khi các electron ở trạng thái năng lượng thấp nhất, chúng được gọi là ở trạng thái cơ bản. Ở trạng thái này chúng quay càng gần hạt nhân càng tốt. Khi năng lượng được thêm vào các nguyên tử, ví dụ dưới dạng nhiệt hoặc điện, các electron sẽ chuyển sang mức năng lượng cao hơn gọi là trạng thái kích thích. Bởi vì thiên nhiên thích trạng thái năng lượng thấp hơn nên các electron phát ra năng lượng bổ sung của chúng dưới dạng ánh sáng. Điều này cho phép các electron quay trở lại trạng thái cơ bản của chúng như biểu đồ trong Hình 3.2.
            </p>
            <p>Ánh sáng phát ra từ một phần tử bị kích thích có thể được truyền qua lăng kính hoặc gradient nhiễu xạ để xác định bước sóng chính xác của ánh sáng do nguyên tử bị kích thích phát ra. Những bước sóng ánh sáng chính xác này được gọi là quang phổ vạch của một nguyên tố. Phổ vạch của hydro được thể hiện trên hình 3.3.</p>
            <p>Mỗi phần tử có phổ vạch riêng. Đây là lý do tại sao phổ vạch của một phần tử cũng được coi là “dấu vân tay” của phần tử cụ thể đó. Vì lượng ánh sáng phát ra bởi các nguyên tử bị kích thích có lượng cố định nên Bohr gọi chúng là lượng ánh sáng “lượng tử hóa”. Những lượng năng lượng cố định này chứng tỏ rằng các electron chỉ có thể thực hiện những bước nhảy nhất định giữa các quỹ đạo ở những khoảng cách cố định trong nguyên tử. Do những quỹ đạo tròn, cố định này, mô hình nguyên tử của Bohr thường được gọi là “mô hình hệ mặt trời” của nguyên tử (xem Hình 3.4).</p>
            <img alt="Hình 3.3" src={Hinhchapter33} className="Hinhchapter"></img>
            <img alt="Hình 3.4" src={Hinhchapter34} className="Hinhchapter"></img>
            </Panel>
            <Panel header="V. Mô hình cơ sóng" key="5" className='Panel'>
            <p>Mô hình cơ sóng của nguyên tử cho thấy cấu trúc nguyên tử phức tạp hơn và cách các electron tự cấu hình ở các mức năng lượng chính. Các mức năng lượng chính được chia thành các mức năng lượng phụ, mỗi mức có tập hợp quỹ đạo riêng biệt. Cấu trúc phức tạp hơn này được phác thảo với sự trợ giúp của sơ đồ này. Các mức năng lượng chính trong nguyên tử được đánh số từ 1 đến 7.
            <br/>
            <b>PEL# &nbsp;  &nbsp;1  &nbsp; &nbsp;2  &nbsp; &nbsp;3  &nbsp; &nbsp;4</b>
            </p>
            <p>Mức năng lượng chính thứ nhất chỉ có một lớp con, mức năng lượng chính thứ hai có hai, mức năng lượng chính thứ ba có ba, v.v. Bây giờ, đường viền có thể được nâng cao:
            <br/>
            <b>PEL# &nbsp;  &nbsp;1  &nbsp; &nbsp;2  &nbsp; &nbsp;3  &nbsp; &nbsp;4</b>
            <br/>
            <b>Subshell &nbsp;  &nbsp;)  &nbsp; &nbsp;) )  &nbsp; &nbsp;) ) )  &nbsp; &nbsp;) ) ) )</b>
            </p>
            <p>Lớp con đầu tiên trong mỗi mức năng lượng chính có chữ cái “s”. Cấp độ con thứ hai có chữ cái “p”, chữ cái thứ ba là “d” và chữ cái thứ tư là “f”. Bây giờ mô hình thậm chí còn được dán nhãn nhiều hơn:
            <br/>
            <b>PEL# &nbsp;  &nbsp;1  &nbsp; &nbsp;2  &nbsp; &nbsp;3  &nbsp; &nbsp;4</b>
            <br/>
            <b>Subshell &nbsp;  &nbsp;)  &nbsp; &nbsp;) )  &nbsp; &nbsp;) ) )  &nbsp; &nbsp;) ) ) )</b>
            <br/>
            <b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;s  &nbsp; &nbsp;s p &nbsp;s p d &nbsp; s p d f</b>
            </p>
            <p>Lớp con s chứa một quỹ đạo hoặc vùng nơi có thể tìm thấy electron. Cấp độ p có ba quỹ đạo, trong khi cấp độ d và f lần lượt có năm và bảy quỹ đạo. Hình dạng của quỹ đạo s và p được thể hiện trên hình 3.5.</p>
            <p>Mỗi quỹ đạo được phép mang tối đa hai electron và theo Nguyên lý loại trừ Pauli, các electron phải có spin ngược nhau.</p>
            <p>Làm thế nào để các electron lấp đầy các mức năng lượng chính này? Hãy xem xét ví dụ đơn giản nhất, hydro và một electron của nó. Vì các electron muốn ở trạng thái năng lượng thấp nhất có thể nên một electron sẽ nằm ở quỹ đạo 1s. Điều này có thể được lập biểu đồ bằng cách viết đơn giản 1s1 hoặc bằng cách vẽ sơ đồ như sau:<img src={Congthuc4Chapter3} className="math-image-inline" alt="Math Formula"/>.</p>
            <p>Vì quỹ đạo 1s có thể chứa tối đa hai electron nên cấu hình electron của helium sẽ như thế này: 1s<sup>2</sup> hoặc <img src={Congthuc5Chapter3} className="math-image-inline" alt="Math Formula"/>. Chú ý rằng các mũi tên chỉ theo những hướng khác nhau.
            <img alt="Hình 3.5" src={Hinhchapter35} className="Hinhchapter"></img>
            hướng. Điều này cho thấy các spin ngược nhau của các electron. Ví dụ tiếp theo sẽ cho thấy quy tắc Hund hoạt động như thế nào. Xét cấu hình electron của nitơ ở trạng thái cơ bản. Nitơ có tổng cộng bảy electron. Hai electron đầu tiên sẽ lấp đầy quỹ đạo 1s. Nhìn vào sơ đồ trên, sau khi quỹ đạo 1s đầy, quỹ đạo 2s sẽ nhận electron. Ba electron còn lại sẽ đi vào quỹ đạo 2p. Cấu hình electron trông như thế này: 1s22s22p3. Điều đáng quan tâm ở đây là làm thế nào các electron tự định hướng theo quỹ đạo 2p. Có hai khả năng:
            <img src={Congthuc6Chapter3} className="math-image" alt="Math Formula"/>
            </p>
            <p>Theo quy tắc Hund, các electron lấp đầy quỹ đạo của chúng một cách đơn lẻ và sau đó chúng bắt đầu ghép đôi. Điều này có nghĩa là tình huống thứ hai được trình bày ở trên là thứ tự điền đúng cho các electron.</p>
            <p><b>Vấn đề:</b></p>
            <p>Viết cấu hình electron của S và Ca.</p>
            <p><b>Giải pháp:</b> Lưu huỳnh có 16 electron. Cấu hình là 1s<sup>2</sup>2s2<sup>2</sup>p<sup>6</sup>3s<sup>2</sup>3p<sup>4</sup> hoặc
            <img src={Congthuc7Chapter3} className="math-image-inline" alt="Math Formula"/>
            </p>
            <p>Ca có 20 electron và có cấu hình như thế này: 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>. <img src={Congthuc8Chapter3} className="math-image-inline" alt="Math Formula"/></p>
            <p>Lưu ý rằng trong bài toán trước quỹ đạo 3d đã bị bỏ qua. Quỹ đạo 3d đầy lên sau khi quỹ đạo 4s đầy lên. Điều này là do quỹ đạo 4s thực sự có ít năng lượng hơn quỹ đạo 3d (không bình thường nhưng đúng). Điều này có nghĩa là thứ tự điền thông qua phần tử số 36, Kr, là 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>. Cũng lưu ý số lượng electron tối đa có thể được giữ ở mức năng lượng chính. Mức năng lượng chính thứ nhất có thể chứa tối đa 2 electron (1s<sup>2</sup>), lần thứ hai lên tới 8 (2s<sup>2</sup>2p<sup>6</sup>) và thứ ba lên đến 18 (3s<sup>2</sup>3p<sup>6</sup>3d<sup>10</sup>). Mẫu này tuân theo phương trình 2n2, trong đó n là số của mức năng lượng chính. Ví dụ, để tìm số electron tối đa có thể được giữ ở mức năng lượng chính thứ tư, bạn có thể nói rằng 2(4)<sup>2</sup> = 32 electron tối đa.</p>
            </Panel>
            <Panel header="VI. Điện tử hóa trị và sơ đồ chấm" key="6" className='Panel'>
            <p>Các electron hóa trị đóng một vai trò rất lớn trong liên kết, như sẽ được trình bày sau. Các electron hóa trị là các electron ở mức năng lượng chính ngoài cùng (không nên nhầm lẫn với lớp ngoài cùng). Những electron này rất quan trọng vì chúng là những electron bị mất, thu được hoặc chia sẻ khi hình thành liên kết hóa học. Các electron hóa trị của một nguyên tử là các electron tương tác với các electron hóa trị của một nguyên tử khác để tạo thành các liên kết này.</p>
            <p><b>Vấn đề:</b></p>
            <p>Có bao nhiêu electron hóa trị trong các nguyên tố Na, P, Cl và Ca?</p>
            <p><b>Giải pháp:</b> Trước hết hãy xét cấu hình electron.</p>
            <p>Na = 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup><b>3s<sup>1</sup></b>. Na có một electron hóa trị.</p>
            <p>P = 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup><b>3s<sup>2</sup>3p<sup>3</sup></b>. P có năm electron hóa trị.</p>
            <p>Cl = 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup><b>3s<sup>2</sup>3p<sup>5</sup></b>. Cl có bảy electron hóa trị.</p>
            <p>Ca = 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup><b>4s<sup>2</sup></b>. Ca có hai electron hóa trị.</p>
            <p>Khi lập sơ đồ hình dạng và cấu trúc của các nguyên tử, điều quan trọng là phải có sơ đồ chấm hóa trị chính xác. Những sơ đồ này rất dễ vẽ vì chúng tuân theo một mẫu đơn giản. Có hai quy tắc bạn cần nhớ khi vẽ sơ đồ dấu chấm hóa trị (xem Hình 3.6):
            <br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; •&nbsp;Hai electron đầu tiên đi cùng nhau ở cùng một phía của ký hiệu, như thể chúng đang lấp đầy quỹ đạo s.
            <br/>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; •&nbsp;Sáu electron tiếp theo lấp đầy đơn lẻ rồi ghép đôi theo quy tắc Hund, như thể chúng lấp đầy quỹ đạo p. Một cách hay để ghi nhớ quy tắc này là tự nhủ: “Đơn, đơn, đơn, sau đó ghép đôi, ghép đôi, ghép đôi.”
            </p>
            <img alt="Hình 3.6" src={Hinhchapter36} className="Hinhchapter"></img>
            <img alt="Hình 3.7" src={Hinhchapter37} className="Hinhchapter"></img>
            <p><b>Vấn đề:</b></p>
            <p>Vẽ sơ đồ chấm hóa trị của N, Ne, O và Ca.</p>
            <p><b>Giải pháp:</b> Xác định cấu hình electron và tìm electron hóa trị:</p>
            <p>N—1s<sup>2</sup><b>2s<sup>2</sup>2p<sup>3</sup></b></p>
            <p>Ne—1s<sup>2</sup><b>2s<sup>2</sup>2p<sup>6</sup></b></p>
            <p>O—1s<sup>2</sup><b>2s<sup>2</sup>2p<sup>4</sup></b></p>
            <p>Ca = 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup><b>4s<sup>2</sup></b>
            </p>
            <p>Sau đó vẽ sơ đồ như hình 3.7.</p>
            </Panel>
            <Panel header={(<div><span>VII. Điện tích hạt nhân hiệu quả —Z</span><sub>eff</sub></div>)} key="7" className='Panel'>
            <p>Tất cả các electron trong nguyên tử đều chịu lực hút của hạt nhân tích điện dương. Tuy nhiên, đồng thời, có một lực đẩy giữa các electron do chúng mang điện tích âm. Điện tích hạt nhân hiệu dụng tác dụng lên một electron hoặc tập hợp electron có thể được tính bằng công thức sau:
            <p className='math-image'>Z<sub>eff</sub> = Z − S</p>
            Trong đó Z là số proton trong hạt nhân và S là số electron giữa các electron hóa trị và hạt nhân. Nếu chúng ta tính điện tích hạt nhân hiệu dụng của electron hóa trị trong nguyên tử sodium, chúng ta sẽ thấy giá trị đó sẽ là 1+. Nhìn vào cấu hình electron của sodium, chúng ta thấy rằng có 10 electron nằm giữa hạt nhân và electron hóa trị: 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>1</sup>.
            </p>
            <p>Z trong trường hợp này là 11 và S là 10, cho Z<sub>eff</sub> = 1+.</p>
            <p><b>Vấn đề:</b></p>
            <p>Điện tích hạt nhân hiệu dụng trên tám electron ở mức năng lượng chính thứ hai của sodium là bao nhiêu?</p>
            <p><b>Giải pháp:</b> Tám electron ở mức năng lượng chính hai sẽ cảm thấy điện tích hạt nhân hiệu dụng +9 vì hạt nhân có điện tích +11 và có hai electron ở mức năng lượng chính một.</p>
            </Panel>
            <Panel header="VIII. Số lượng tử" key="8" className='Panel'>
            <p>Để giúp theo dõi từng electron có mặt trong một nguyên tử, bốn số lượng lượng tử được gán cho mỗi electron. Các quy tắc để gán số lượng lượng tử như sau:</p>
            <p>•&nbsp;Số đầu tiên được gọi là số lượng tử chính, n, và nó có thể là số nguyên bất kỳ. Số lượng tử đầu tiên, n, biểu thị mức năng lượng chính mà electron đang xét. Ví dụ, một electron trong H là 1s<sup>1</sup> và n sẽ bằng 1. Electron hóa trị của Li, 1s<sup>2</sup>2s<sup>1</sup>, sẽ có n bằng 2.</p>
            <p>•&nbsp;Số thứ hai được gọi là số lượng tử động lượng góc, l, và nó có thể là số nguyên từ 0 đến n – 1. Số lượng tử thứ hai biểu thị cấp con mà electron ở trong đó. Nếu electron ở quỹ đạo s, thì l = 0. Một electron trong quỹ đạo p sẽ có l = 1, v.v.</p>
            <p>•&nbsp;Số thứ ba được gọi là số lượng tử từ, ml, và nó có thể là số nguyên nằm trong khoảng từ –l đến + l. Số lượng tử thứ ba giúp chúng ta xác định vị trí của electron được đề cập ở vùng nào của mỗi cấp độ con.Những vùng này là quỹ đạo cụ thể.</p>
            <p>•&nbsp;Số lượng tử thứ tư là ms và nó chỉ có thể có giá trị +1/2 hoặc –1/2.</p>
            <p>Số lượng tử thứ tư biểu thị hướng quay của electron. Các dấu ngược nhau biểu thị các spin ngược nhau.</p>
            <p>Việc gán số lượng tử cho các electron của một vài nguyên tử đơn giản sẽ giúp chúng ta biết cách gán các số này.</p>
            <p><b>Vấn đề:</b></p>
            <p>Một nguyên tử hydro có một electron và được ký hiệu là 1s<sup>1</sup>. Số lượng tử sẽ là bao nhiêu?</p>
            <p><b>Giải pháp:</b> Trong trường hợp này n sẽ bằng 1 vì electron ở mức năng lượng chính là 1. l phải bằng 0 vì l là số từ 0 đến n – 1.</p>
            <p>ml bằng 0 vì giá trị của l là 0.</p>
            <p>ms bằng +1/2.</p>
            <p>Các số lượng tử là 1, 0, 0, +1/2.</p>
            <p><b>Vấn đề:</b></p>
            <p>Gán số lượng tử cho electron hóa trị của nguyên tử lithium.</p>
            <p><b>Giải pháp:</b> Electron hóa trị duy nhất của lithium có cấu hình electron là [He]2s1. Từ đó chúng ta có thể thấy rằng:</p>
            <p>n = 2 vì electron hóa trị ở mức năng lượng chính thứ hai.</p>
            <p>l có thể là 0 hoặc 1 (2 – 1 = 1). Chúng tôi gán số 0 đầu tiên là l = 1 vì nó sẽ không được sử dụng cho đến khi chúng ta bắt đầu điền vào quỹ đạo p.</p>
            <p>ml bằng 0 vì giá trị của l là 0.</p>
            <p>ms bằng +1/2.</p>
            <p>Các số lượng tử là 2, 0, 0, +1/2.</p>
            <p><b>Vấn đề:</b></p>
            <p>Gán số lượng tử cho electron thứ mười lấp đầy nguyên tử neon.</p>
            <p><b>Giải pháp:</b> n = 2, l = 1, ml = 1 và ms = –1/2.</p>

           </Panel>
            <Panel header="IX. Lai tạo" key="9" className='Panel'>
            <p>Carbon là một ngoại lệ đối với các quy tắc viết biểu đồ chấm hóa trị như mô tả ở trên. Việc kiểm tra chặt chẽ carbon và các electron hóa trị của nó cho thấy một câu chuyện khác, bằng chứng là carbon có thể tạo ra bốn liên kết. Carbon có 6 electron và cấu hình electron của nó là 1s<sup>2</sup>2s<sup>2</sup>2p<sup>2</sup>. Sơ đồ dấu chấm hóa trị theo cách sắp xếp này sẽ trông giống như:</p>
            <img src={Congthuc9Chapter3} className="math-image" alt="Math Formula"/>
            <p>Theo sơ đồ chấm này, carbon chỉ tạo ra hai liên kết. Tuy nhiên, đây không phải là trường hợp tất cả. Thay vào đó, carbon có sự sắp xếp 1s<sup>2</sup>2s<sup>2</sup>2p<sup>3</sup> hoặc</p>
            <img src={Congthuc10Chapter3} className="math-image" alt="Math Formula"/>
            <p>Đây được gọi là sự lai hóa sp<sup>3</sup> của nguyên tử cacbon. Một trong các electron đã chuyển từ quỹ đạo 2s sang quỹ đạo 2p. Điều này hiện mang lại cho carbon bốn electron đơn lẻ thay vì hai electron ghép đôi và hai electron chưa ghép cặp. Đó là các electron đơn lẻ liên kết với nhau để cố gắng trở thành cặp đôi. Bởi vì có bốn electron đơn trong nguyên tử carbon lai sp3 nên carbon có thể liên kết bốn nguyên tử khác nhau với bốn electron đơn của nó. Để có bốn electron là electron chưa ghép cặp, quá trình lai hóa sp3 cũng làm thay đổi hình dạng của các quỹ đạo s và p có liên quan đến liên kết. Sự thay đổi này được thể hiện trong Hình 3.8.</p>
            <p>Sự sắp xếp mới được gọi là hình tứ diện vì các nguyên tử tạo với nhau một góc 109,5 độ. Điều này có thể được nhìn thấy trong hình dạng ba chiều của metan, một phân tử có dạng hình học phân tử tứ diện. Nếu chỉ có ba nguyên tử liên kết với nguyên tử lai hóa sp3 thì hình học phân tử được gọi là hình chóp tam giác. Amoniac là một ví dụ về điều này. Cuối cùng, trong nước oxy bị lai hóa sp3 nhưng vì chỉ có hai nguyên tử liên kết với oxy nên hình dạng phân tử được cho là bị uốn cong (xem Hình 3.9).</p>
            <img alt="Hình 3.8" src={Hinhchapter38} className="Hinhchapter"></img>
            <img alt="Hình 3.9" src={Hinhchapter39} className="Hinhchapter"></img>
            <img alt="Hình 3.10" src={Hinhchapter310} className="Hinhchapter"></img>
            <img alt="Hình 3.11" src={Hinhchapter311} className="Hinhchapter"></img>
            <p>Trong lai hóa sp<sup>2</sup>, một obitan 2s và hai obitan 2p kết hợp để tạo thành hình dạng mới như trên Hình 3.10.</p>
            <p>Ở trạng thái lai hóa này, carbon sẽ tạo ra hai liên kết đơn và một liên kết đôi. Điều này sẽ cho phép nguyên tử carbon liên kết với ba nguyên tử khác nhau. Sự định hướng của các nguyên tử này xung quanh nguyên tử carbon sẽ là hình học phân tử phẳng lượng giác. Góc của các nguyên tử này với nhau là 120 độ. Điều này được thể hiện qua sơ đồ ethene trên Hình 3.11.</p>
            <p>Khi một nguyên tử được lai hóa sp, quỹ đạo của một s kết hợp với một quỹ đạo p. Điều này cho phép một nguyên tử như carbon tạo ra hai liên kết đôi hoặc một liên kết đơn và một liên kết ba. Hai nguyên tử liên kết với nguyên tử carbon trong trường hợp này sẽ tự định hướng cách nhau 180 độ. Đây được gọi là hình học phân tử tuyến tính (xem Hình 3.12).</p>
            <img alt="Hình 3.12" src={Hinhchapter312} className="Hinhchapter"></img>
            <img alt="Bảng 3" src={Bang3Chapter3} className="Bangchapter"></img>
            <p>Trên đây là so sánh song song giữa ba trạng thái lai:</p>
            <p><b>Vấn đề:</b></p>
            <p>Sự lai hóa của cacbon trong CCl<sub>4</sub>, trong HCN và trong CH<sub>2</sub>O là gì??</p>
            <p><b>Giải pháp:</b> Trong CCl<sub>4</sub>, nguyên tử carbon tạo thành tất cả các liên kết đơn. Carbon được lai hóa sp3 và các nguyên tử chlorine sẽ cách nhau 109.5 độ. Carbon trong HCN có liên kết đơn với nguyên tử hydrogen và liên kết ba với nguyên tử nitrogen. Nguyên tử carbon này được lai hóa sp. Nguyên tử carbon trong CH<sub>2</sub>O có liên kết đôi với nguyên tử oxy và liên kết đơn với nguyên tử hydrogen. Nguyên tử carbon này ở trạng thái lai hóa sp<sup>2</sup>.</p>
            </Panel>
            <Panel header="X. Ion và Quy tắc Octet" key="10" className='Panel'>
            <p>Số lượng electron trong một nguyên tử có thể được tìm thấy bằng cách nhìn vào số hiệu nguyên tử, với điều kiện nguyên tử đó là trung tính. Trong một nguyên tử trung hòa, số proton bằng số electron. Sự cân bằng giữa điện tích dương và âm là nguyên nhân làm cho nguyên tử trung hòa. Nhưng điều gì xảy ra nếu một nguyên tử nhận thêm hoặc mất bớt electron? Khi nguyên tử mất đi hoặc nhận thêm electron thì nó trở thành ion. Nguyên tử lúc này có số proton và số electron không bằng nhau (số proton không thay đổi). Khi một nguyên tử mất electron, nó sẽ mất điện tích âm. Trong trường hợp này, số proton nhiều hơn số electron và ion mang điện tích dương. Một ion mang điện tích dương được gọi là cation. Khi một nguyên tử nhận thêm electron, nó sẽ mang điện tích âm. Trong trường hợp này, số electron nhiều hơn số proton và ion mang điện tích âm. Một ion có điện tích âm được gọi là anion.</p>
            <p>Một nguyên tử sẽ tăng hay giảm bao nhiêu electron? Một ion sẽ phải chịu bao nhiêu điện tích? Có một mô hình đơn giản để làm theo nhưng cuối cùng bạn sẽ thấy rằng tất cả phụ thuộc vào số lượng electron hóa trị mà một nguyên tử có. Có một điểm chung mà tất cả các ion đều có: Chúng hình thành sao cho có 8 electron hóa trị ở mức năng lượng chính ngoài cùng. Đây được gọi là quy tắc Octet. Có tám electron trong vỏ hóa trị giúp nguyên tử có cấu hình electron ổn định. Khi đã đạt được tám electron hóa trị, rất khó để sửa đổi cấu hình ổn định này.</p>
            <p>Để xác định điện tích mà một nguyên tử sẽ đảm nhận dưới dạng ion, trước tiên hãy xem cấu hình electron của nguyên tử. Ví dụ, natri có 11 electron và cấu hình electron là 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>1</sup>. Để đạt được một octet, sodium có hai lựa chọn – nhận thêm bảy electron hoặc chỉ mất một electron. Mất một electron là nhiệm vụ dễ dàng hơn nhiều so với việc thu được bảy electron. Khi nguyên tử sodium mất đi một electron (mất điện tích âm), ion sodium có điện tích 1+ và nguyên tử được viết là Na<sup>1+</sup>. Sau khi mất đi một electron, cấu hình electron mới của sodium là 1s<sup>2</sup><b>2s<sup>2</sup>2p<sup>6</sup></b>. Tám electron hóa trị được in đậm để nhấn mạnh quy tắc Octet.</p>
            <p>Một ví dụ khác là ion tạo thành lưu huỳnh. Lưu huỳnh có cấu hình electron là 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup><b>3s<sup>2</sup>3p<sup>4</sup></b>. Lưu huỳnh có sáu electron hóa trị như được in đậm. Để lưu huỳnh đạt được octet ổn định, nó có thể mất sáu electron hoặc thu thêm hai electron. Việc thu được hai electron là một nhiệm vụ khả thi hơn và việc thu được hai electron sẽ mang lại cho ion lưu huỳnh điện tích 2−. Cấu hình electron mới của lưu huỳnh là 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup><b>3s<sup>2</sup>3p<sup>6</sup></b>. Một lần nữa, tám electron hóa trị đã được nhấn mạnh.</p>
            <p><b>Vấn đề:</b></p>
            <p>Điện tích của các nguyên tố sau khi tạo thành ion: Ca, Al, F, N, Ne sẽ như thế nào?</p>
            <p>Ca—1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>.</p>
            <p>Al—1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>1</sup></p>
            <p>F—1s<sup>2</sup>2s<sup>2</sup>2p<sup>5</sup></p>
            <p>N—1s<sup>2</sup>2s<sup>2</sup>2p<sup>3</sup></p>
            <p>Ne—1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup></p>
            <p>Bây giờ hãy xem cấu hình và quyết định đâu là cách dễ nhất để có được octet ổn định. Calcium sẽ mất hai electron và trở thành Ca<sup>2+</sup>. Aluminium sẽ mất ba electron và trở thành Al<sup>3+</sup>. Fluorine sẽ nhận thêm một electron và trở thành F<sup>1−</sup>. Nitrogen sẽ nhận thêm ba electron và trở thành N<sup>3−</sup>. Neon sẽ không mất hoặc thu thêm bất kỳ electron nào vì octet ổn định của nó.</p>
            </Panel> 
            <Panel header="XI. Các ngoại lệ đối với Quy tắc Octet" key="11" className='Panel'>
            <p>Có những ngoại lệ đối với quy tắc bát tử. Ví dụ, helium cực kỳ ổn định chỉ với hai electron hóa trị ở mức năng lượng chính ngoài cùng của nó. Điều tương tự cũng đúng với các ion lithium và beryllium. Điều này chỉ ra rằng
            <img alt="Hình 3.13" src={Hinhchapter313} className="Hinhchapter"></img>
            việc có một octet để ổn định nguyên tử không phải là vấn đề lớn mà vấn đề là phải có mức năng lượng chính đầy đủ ngoài cùng.
            </p>
            <p>Một ngoại lệ cuối cùng đối với quy tắc bát tử nằm ở liên kết của nguyên tử boron. Boron thích sáu electron ở mức năng lượng chính ngoài cùng của nó. Điều này cho phép các hợp chất chứa boron tạo ra ba liên kết theo cách sắp xếp phẳng lượng giác. Hai ví dụ là BH<sub>3</sub> và BF<sub>3</sub> như hình 3.13.</p>
            </Panel>
            <Panel header="XII. Dòng Isoelectronic" key="12" className='Panel'>
            <p>Các nguyên tử sẽ thu được, mất đi hoặc chia sẻ các electron hóa trị để đạt được cấu hình octet (trong hầu hết các trường hợp) hoặc cấu hình electron tương tự như cấu hình của khí hiếm. Ví dụ, tất cả các nguyên tử và ion sau đây đều có 18 electron và cấu hình electron tương tự cấu hình của khí hiếm, argon: S<sup>2-</sup>, Cl<sup>1-</sup>, Ar, K<sup>1+</sup>, and Ca<sup>2+</sup>. Tất cả các nguyên tử/ion này đều có cấu hình electron là 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>.</p>
            <p>Biết được thông tin vừa trình bày, bây giờ chúng ta có thể dự đoán kích thước tương đối của các nguyên tử và ion được trình bày. Bởi vì tất cả chúng đều có 18 electron nên chúng ta có thể xem xét số lượng proton có mặt. Ion có số proton lớn nhất, Ca, sẽ có bán kính nhỏ nhất vì nó có “lực hút” hạt nhân lớn nhất lên 18 electron. Lưu huỳnh, chỉ với 16 proton, sẽ có lực hút hạt nhân ít nhất đối với 18 electron mà nó có. Điều này giúp giải thích tại sao các nguyên tử phi kim lại nhỏ hơn các ion tương ứng của chúng. Tương tự, nó cũng giải thích tại sao các nguyên tử kim loại lại lớn hơn các ion tương ứng của chúng.</p>
            </Panel>
          </Collapse>
        </div>
      </div>  
    );
  }

export default Chapter3thongtin;