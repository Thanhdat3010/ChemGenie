import React from 'react';
import { Collapse} from 'antd';
import "./Chapter4thongtin.css"
import Hinhchapter42 from "../Hinhchapter/Chapter4.2.png";
import Hinhchapter43 from "../Hinhchapter/Chapter4.3.png";
import Hinhchapter44 from "../Hinhchapter/Chapter4.4.png";
import Hinhchapter45 from "../Hinhchapter/Chapter4.5.png";
import Bang1Chapter4  from "../Hinhchapter/Bang1Chapter4.png"
import Bang2Chapter4  from "../Hinhchapter/Bang2Chapter4.png"
import Bang3Chapter4  from "../Hinhchapter/Bang3Chapter4.png"


const { Panel } = Collapse;
function Chapter4thongtin() {
    return (
      <div id="faq" className="block faqBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>Bảng tuần hoàn và xu hướng tuần hoàn</h2>
          </div>
          <Collapse defaultActiveKey={['1']} size="large">
            <Panel header="I. Lịch sử của bảng tuần hoàn" key="1" className='Panel'>
            <p>Bảng tuần hoàn đã được phát triển và hoàn thiện trong nhiều năm. Mặc dù có rất nhiều nhà khoa học có đóng góp cho bảng tuần hoàn nhưng hai nhà khoa học được công nhận nhiều nhất là Dmitry Mendeleyev và Henry Moseley. Mendeleyev, mặc dù bảng tuần hoàn của ông thiếu các thành phần, nhưng lại được ghi nhận nhiều nhất về bảng tuần hoàn và các xu hướng tuần hoàn. Sau đó, Moseley sử dụng một kỹ thuật gọi là tinh thể học tia X và phát hiện ra ý tưởng về số nguyên tử. Khám phá này là cơ sở cho việc sắp xếp bảng tuần hoàn hiện đại. Đã có những bảng tuần hoàn được đề xuất dựa trên khối lượng nguyên tử, nhưng những cách sắp xếp này không đủ vì các đồng vị có thể tồn tại đối với một nguyên tố.</p>

            </Panel>
            <Panel header="II. Sự sắp xếp của bảng tuần hoàn" key="2" className='Panel'>
            <p>Bảng tuần hoàn chứa một số chu kỳ và nhóm. Các khoảng thời gian là các hàng ngang. Chúng được đánh số từ 1 đến 7. Các nhóm (hoặc họ) là các cột dọc. Chúng được đánh số từ 1 đến 18. Khi chúng ta di chuyển qua các họ hoặc các thời kỳ, chúng ta có thể khám phá ra nhiều xu hướng xảy ra trong bảng tuần hoàn. Điều này được gọi là Luật định kỳ. Bạn sẽ được cung cấp bảng tuần hoàn khi làm bài kiểm tra SAT II: Hóa học. LƯU Ý: Bảng tuần hoàn hoàn chỉnh được cung cấp trong Phụ lục 3 ở cuối cuốn sách này.</p>
            </Panel>
            <Panel header="III. Cân bằng" key="3" className='Panel'>
            <p>Hai loại nguyên tố trong bảng tuần hoàn là kim loại và phi kim.</p>
            <p>Thuộc tính của chúng được tóm tắt trong biểu đồ dưới đây:</p>
            <img alt="Bảng 1" src={Bang1Chapter4} className="Bangchapter"></img>
            <p>Các bán kim loại, hay á kim, được biết là có một số tính chất của kim loại và một số tính chất của phi kim. Các bán kim loại là B, Si, Ge, As, Sb, Te và At . Chúng được tô đậm trong bảng tuần hoàn từng phần ở Hình 4.1.</p>
            <img alt="Bảng 2" src={Bang2Chapter4} className="Bangchapter"></img>
            <p>Các nguyên tố nằm ở bên trái của bán kim loại là kim loại; những thứ ở bên phải của bán kim loại là phi kim loại. Việc xác định một nguyên tố là kim loại, phi kim hoặc bán kim là rất quan trọng trong việc xác định các xu hướng định kỳ và xác định các loại liên kết mà các nguyên tử sẽ hình thành với nhau.</p>
            <p><b>Vấn đề:</b></p>
            <p>Xác định các nguyên tố sau là kim loại, phi kim hoặc bán kim loại: potassium, calcium, bromine, hydrogen và neon.</p>
            <p><b>Lời giải:</b> K và Ca nằm ở bên trái bảng tuần hoàn và là kim loại. Br và Ne nằm ở phía bên phải của bán kim loại và là phi kim. Hydrogen, mặc dù nằm ở phía bên trái của bảng tuần hoàn, nhưng lại là một phi kim. Nếu bạn vẫn chưa bị thuyết phục về hydrogen, hãy tự hỏi bản thân về các tính chất của khí hydrogen và xem những đặc tính đó phù hợp ở đâu trong biểu đồ so sánh ở trang 1.77.</p>
            </Panel>
            <Panel header="IV. Gia đình" key="4" className='Panel'> 
            <p>Một số nhóm hoặc họ được đặt những cái tên đặc biệt và có những đặc tính nhất định cần được giải quyết. Nhưng trước tiên bạn phải hiểu tại sao các phần tử lại được xếp vào cùng một nhóm. Hãy nghĩ về một gia đình mà bạn biết, không phải gia đình hóa học mà là gia đình nhân loại. Trẻ em trông giống cha mẹ của chúng. Chúng học cách làm mọi việc từ cha mẹ và làm theo cách tương tự. Điều tương tự cũng đúng với các nguyên tố trong các họ của bảng tuần hoàn; họ phản ứng theo cùng một cách (phần lớn). Như bạn đã học ở chương trước, mỗi nguyên tố có một số electron hóa trị nhất định. Như bạn sẽ học trong chương tiếp theo, chính số electron hóa trị của một nguyên tử quyết định khả năng phản ứng hóa học của nó. Bởi vì các nguyên tố trong một họ có cùng số electron hóa trị nên chúng sẽ có khả năng phản ứng hóa học tương tự nhau. Ví dụ, Na và K có thể được so sánh về cấu hình electron và các ion được hình thành: Na - 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup><b>3s<sup>1</sup></b> và K - 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup><b>4s<sup>1</sup></b>.</p>
            <p>Cả hai nguyên tử đều có 1 electron hóa trị và sẽ mất đi một electron này để tạo thành các ion có điện tích 1+. Điện tích tương tự này có nghĩa là cả hai nguyên tố đều có khả năng phản ứng hóa học tương tự nhau.</p>
            <p>Các gia đình và nhóm quan trọng được liệt kê dưới đây kèm theo các đặc điểm quan trọng của chúng. Những đặc điểm này sẽ trở nên quen thuộc hơn với bạn khi bạn nghiên cứu chương về sự gắn kết.</p>
            <img alt="Bảng 3" src={Bang3Chapter4} className="Bangchapter"></img>
            <p>Có những xu hướng định kỳ quan trọng xảy ra xuyên suốt các thời kỳ và lên xuống của các nhóm. Tốt nhất bạn nên nhớ xu hướng của một vài yếu tố. Điều này sẽ đơn giản hóa các xu hướng rất nhiều và làm cho các câu hỏi về xu hướng định kỳ trở nên dễ trả lời nhất trong bài kiểm tra.</p>
            </Panel>
            <Panel header="V. Độ âm điện" key="5" className='Panel'>
            <p>Độ âm điện là thước đo khả năng thu hút electron của nguyên tử. Độ âm điện của các nguyên tố được cho giá trị từ 0,0 đến 4,0. Giá trị độ âm điện lớn nhất thuộc về fluorine, 4,0. Vậy nguyên tố có độ âm điện thấp nhất ở đâu? Nhìn xa nhất từ fluorine và nhìn về phía dưới bên trái của bảng tuần hoàn. Francium, Fr, có độ âm điện là 0,7. Điều này sẽ có ý nghĩa vì phi kim có xu hướng nhận electron và có giá trị độ âm điện cao hơn, trong khi kim loại có xu hướng mất electron và có giá trị độ âm điện thấp hơn. Vì chúng không phản ứng nên các khí hiếm không có giá trị về độ âm điện.</p>
            <p><b>Đặt vấn đề:</b></p>
            <p>Chất nào được cho là có độ âm điện thấp hơn, Na hay S?</p>
            <p><b>Lời giải:</b> Na có độ âm điện thấp hơn vì nó khác xa fluorine trong bảng tuần hoàn.</p>
            </Panel>
            <Panel header="VI. Năng lượng ion hóa" key="6" className='Panel'>
            <p>Năng lượng ion hóa, như tên gọi của nó, là năng lượng cần thiết để loại bỏ một electron khỏi nguyên tử và tạo thành ion. Khái niệm này sẽ dễ dàng nhận ra trong bảng tuần hoàn một khi bạn đã nắm được ý tưởng về độ âm điện. Phải mất rất nhiều năng lượng để loại bỏ các electron khỏi các octet rất ổn định của khí hiếm. Ví dụ, đối với helium, năng lượng ion hóa thứ nhất là 2372 kJ/mol, trong khi neon có năng lượng ion hóa thứ nhất là 2081 kJ/mol. Fluorine, có độ âm điện cao nhất và khả năng “giữ” electron, có năng lượng ion hóa thứ nhất là 1681 kJ/mol.</p>
            <p>Bây giờ bạn có thể đoán rằng điều ngược lại cũng đúng với kim loại khi bạn tránh xa flo và các khí hiếm. Bằng chứng nằm ở năng lượng ion hóa đầu tiên của sắt (762 kJ/mol) và kali (419 kJ/mol). Những giá trị này chỉ là một phần năng lượng ion hóa đầu tiên đối với một số phi kim nhất định.</p>
            <p><b>Đặt vấn đề:</b></p>
            <p>Chất nào được cho là có năng lượng ion hóa lớn hơn, Ca hay Br?</p>
            <p><b>Lời giải:</b> Br nằm gần F hơn và sẽ có năng lượng ion hóa cao hơn.</p>

            </Panel>
            <Panel header="VII. Bán kính nguyên tử" key="7" className='Panel'>
            <p>
            Bán kính nguyên tử của nguyên tử có thể được định nghĩa là khoảng cách từ hạt nhân của nó đến electron ngoài cùng của nguyên tử đó. Khi bạn đi xuống một nhóm, bán kính của các nguyên tử sẽ tăng lên khi các nguyên tử lấp đầy nhiều mức năng lượng chính hơn bằng các electron. Bằng chứng cho xu hướng này có thể thấy ở lithium, chất có bán kính nguyên tử 155 picomet (10−12 mét) và Caesium, có bán kính nguyên tử 267 picomet. Bạn có thể mong đợi điều tương tự xảy ra khi bạn kiểm tra các phần tử từ trái sang phải trong một khoảng thời gian. Nếu lithium có ít electron hơn fluorine thì lithium phải có bán kính nhỏ hơn fluorine, phải không? Sai! Fluorine có chín electron và lithium chỉ có ba electron, tuy nhiên fluorine có bán kính nguyên tử là 57 picometers và lithium có bán kính 155 picometers. Tại sao lại có sự khác biệt? Fluorine có nhiều proton và điện tích dương trong hạt nhân hơn lithium. Hóa ra là khi nhìn vào bán kính nguyên tử trong một chu kỳ, chính điện tích hạt nhân (chứ không phải số electron) sẽ xác định bán kính của nguyên tử.
            </p>
            </Panel>
            <Panel header="VIII. Bán kính ion" key="9" className='Panel'>
           <p>Như đã đề cập ở chương trước, nguyên tử có thể nhận hoặc mất electron. Các ion thu được có thể có bán kính khác với bán kính của nguyên tử ban đầu. Khi phi kim nhận thêm electron thì bán kính ion của anion sẽ lớn hơn bán kính của nguyên tử phi kim. Điều này được thể hiện trong Hình 4.2.</p>
           <img alt="Hình 4.2" src={Hinhchapter42} className="Hinhchapter"></img>
           <p>Điều ngược lại đúng với các nguyên tử và cation kim loại. Kim loại mất electron và sẽ bị giảm bán kính như trên Hình 4.3.</p>
           <img alt="Hình 4.3" src={Hinhchapter43} className="Hinhchapter"></img>
           </Panel>
            <Panel header="IX. Các khối s, p, d và f" key="10" className='Panel'>
            <p>Vị trí của một nguyên tố trên bảng tuần hoàn có thể cho biết rất nhiều điều về số lượng electron hóa trị mà nguyên tố đó có và những electron hóa trị này có thể nằm trong lớp vỏ con nào. Các khối này được phác thảo trong Hình 4.4.</p>
            <p>Các kim loại kiềm và kiềm thổ có các electron hóa trị ở phân lớp s. Các nhóm từ 13 đến 18 có các electron hóa trị nằm ở phân lớp p. Các nguyên tố chuyển tiếp có các electron hóa trị của chúng ở phân lớp d, và cuối cùng, các nguyên tố lanthanide và Actinide có các electron hóa trị ở phân lớp f.</p>
            <p>Cuối cùng, khi chúng ta di chuyển sang bên phải của bảng tuần hoàn, chúng ta thấy rằng các nguyên tố có thể phản ứng để tạo thành các hợp chất có tính acid. Một số ví dụ là HF, HCl, HBr, HI và H<sub>3</sub>O<sup>+</sup> . Khi chúng ta di chuyển sang bên trái của bảng tuần hoàn, các nguyên tố có thể phản ứng để tạo thành các hợp chất cơ bản như NaOH, KOH và Ca(OH)<sub>2</sub>.</p>
            <img alt="Hình 4.4" src={Hinhchapter44} className="Hinhchapter"></img>
            <img alt="Hình 4.5" src={Hinhchapter45} className="Hinhchapter"></img>

            </Panel>
          </Collapse>
        </div>
      </div>  
    );
  }

export default Chapter4thongtin;