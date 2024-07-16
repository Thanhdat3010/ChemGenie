import React from 'react';
import './Chapter1thongtin.css';
import { Collapse } from 'antd';
import Hinhchapter1 from "../Hinhchapter/Chapter1.1.png";

const { Panel } = Collapse;

function Chapter1thongtin() {
  return (
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>VẬT CHẤT VÀ NĂNG LƯỢNG</h2>
        </div>
        <Collapse defaultActiveKey={['1']} size="large">
          <Panel header="I. Vật chất" key="1" className='Panel'>
            <p>Hóa học là nghiên cứu về <i>vật chất</i>, nghĩa là bất cứ thứ gì chiếm không gian và có khối lượng. <i>Khối lượng</i> (thước đo số lượng hạt trong một vật thể) không nên được hợp nhất với trọng lượng, đó là ảnh hưởng của trọng lực đến khối lượng. Bởi vì lực hấp dẫn có thể khác nhau, một vật thể có cùng khối lượng trên Trái đất như trên mặt trăng sẽ có trọng lượng thấp hơn trên mặt trăng vì có ít lực hấp dẫn hơn trên mặt trăng. Bởi vì vật chất có khối lượng và chiếm một <i>thể tích</i> (không gian) nhất định, <i>mật độ</i> cho bất kỳ loại vật chất nào cũng có thể được tính bằng phương trình: D = m / V. Các đơn vị thường được sử dụng để tính mật độ là gam (đối với khối lượng) và mililit (mL cho thể tích). Đôi khi đơn vị centimet khối (cm³) được sử dụng thay vì mililit. Các khối lượng này là tương đương.</p>
            <p><b>Đặt vấn đề:</b> Khối lượng riêng của một khối lập phương có chiều dài mỗi cạnh là 2,0 cm và nặng 6,0 gam là bao nhiêu?</p>
            <p><b>Giải pháp:</b> Vì chiều dài mỗi cạnh của hình lập phương này là 2,0 cm nên thể tích sẽ là chiều dài × chiều rộng × chiều cao. Đây là (2,0 cm)×(2,0 cm)×(2,0 cm), hoặc 8 cm³. Khối lượng là 6,0 gam. Thay thế vào phương trình D = m / V và bạn nhận được D = 6,0 gam / 8 cm³. Mật độ của chất rắn này là 0,75 gam / cm³.</p>
          </Panel>
          <Panel header="II. Hóa chất" key="2" className='Panel'>
            <p>Một <i>chất</i> có thể được định nghĩa là bất kỳ loại vật chất nào có tính chất và thành phần giống hệt nhau. Các chất được phân loại là <i>nguyên tố</i> hoặc <i>hợp chất</i>. Các nguyên tố không thể bị phân hủy về mặt hóa học, trong khi các hợp chất có thể bị phân hủy về mặt hóa học. Một nguyên tố được tạo thành từ một <i>nguyên tử</i> cụ thể, khối xây dựng cơ bản của vật chất. Các hợp chất được hình thành từ liên kết của hai hoặc nhiều nguyên tố. Xét phản ứng: CH₄ + 2O₂ → 2H₂O + CO₂. Phản ứng cho thấy các nguyên tố carbon, hydrogen và oxygen trong các hợp chất khác nhau. Phương trình hóa học cũng cho thấy các hợp chất thay đổi như thế nào trong quá trình phản ứng. Mặc dù các hợp chất ở bên trái mũi tên không giống với các hợp chất ở bên phải mũi tên nhưng các nguyên tố trong phản ứng vẫn là carbon, hydrogen và oxygen.</p>
            <p><i>Hỗn hợp</i> là kết quả của sự kết hợp của các nguyên tố và/hoặc hợp chất. Trong một hỗn hợp:</p>
            <p>•&nbsp;Các chất không kết hợp về mặt hóa học (mỗi chất giữ nguyên tính chất của nó).</p>
            <p>•&nbsp;Tỷ lệ các chất có thể khác nhau.</p>
            <p>•&nbsp;Các chất có thể được tách thành các nguyên tố và/hoặc hợp chất ban đầu.</p>
            <p>Hỗn hợp có thể được phân loại là <i>đồng nhất</i> (giống nhau) hoặc <i>không đồng nhất</i> (không giống nhau). Một ví dụ về hỗn hợp đồng nhất là sữa đồng nhất. Bạn không cần phải lắc sữa trước khi sử dụng vì tất cả các mẫu sữa đồng nhất sẽ giống nhau. Dung dịch là hỗn hợp đồng nhất của chất tan hòa <i>tan</i> trong <i>dung môi</i> và có thể được biểu diễn bằng một chất theo sau là ký hiệu (aq) để chứng tỏ chất đó đã tạo thành hỗn hợp đồng nhất với nước (<i>dung dịch</i> nước). Một ví dụ về hỗn hợp không đồng nhất là hỗn hợp cát trong nước. Cát chắc chắn sẽ lắng xuống đáy thùng cho dù bạn có khuấy hỗn hợp đến mức nào.</p>
            <p><b>Đặt vấn đề:</b> Phân loại các chất sau thành nguyên tố, hợp chất hoặc hỗn hợp: nước muối, nước, argon, methane và iron.</p>
            <p><b>Giải pháp:</b> Nước muối là hỗn hợp đồng nhất của nước và NaCl. Nước là hợp chất được tạo thành từ hydrogen và oxygen. Argon là một nguyên tố. Methane là hợp chất được tạo thành từ hydrogen và carbon. Iron là một nguyên tố.</p>
          </Panel>
          <Panel header="III. Tính chất hóa học và vật lý" key="3" className='Panel'>
            <p>Tất cả các chất đều có tính chất vật lý và hóa học. <i>Tính chất vật lý</i> là những tính chất có thể quan sát và đo lường được của các chất. Chúng bao gồm pha (rắn, lỏng hoặc khí), màu sắc, mùi, mật độ, điểm sôi hoặc điểm nóng chảy. <i>Tính chất hóa học</i> là tính chất được quan sát thấy khi một chất này phản ứng với các chất khác. Những thay đổi hóa học dẫn đến các chất có tính chất vật lý khác nhau. Ví dụ, khi iron (kim loại rắn, màu xám) phản ứng với khí oxygen (một loại khí không mùi, không màu) tạo ra Iron oxide hoặc rỉ sét (chất rắn có màu đỏ cam). Bạn cũng có thể lưu ý những thay đổi về mật độ, điểm nóng chảy và điểm sôi của iron, oxygen và Iron oxide.</p>
            <p><b>Đặt vấn đề:</b> Phân loại những thay đổi sau đây thành những thay đổi vật lý hoặc hóa học: đốt một mảnh giấy, đập vỡ một viên phấn, làm tan chảy một khối nước đá và sự rỉ sét của một chiếc đinh sắt.</p>
            <p><b>Giải pháp:</b> Đốt giấy là thay đổi hóa học; đập phấn là thay đổi vật lý; làm tan chảy nước đá là thay đổi vật lý; rỉ sắt là thay đổi hóa học.</p>
          </Panel>
          <Panel header="IV. Năng lượng" key="4" className='Panel'>
            <p>Hóa học được định nghĩa là nghiên cứu về vật chất, nhưng năng lượng đóng một vai trò quan trọng trong hóa học. Năng lượng được định nghĩa là khả năng thực hiện công. Năng lượng được bảo toàn, tức là nó không được tạo ra hay bị phá hủy. Điều này có nghĩa là lượng năng lượng bị mất bởi một hệ thống luôn bằng lượng năng lượng thu được bởi hệ thống khác. Năng lượng cũng có thể được chuyển đổi từ dạng này sang dạng khác. Ví dụ, máy nướng bánh mì hoặc máy sấy tóc chuyển đổi năng lượng điện thành năng lượng nhiệt.</p>
            <p>Đơn vị dùng để đo lượng năng lượng là <i>jun</i> hoặc <i>calo</i>. Hầu hết mọi người quen thuộc hơn với thuật ngữ calo. Đây không phải là vấn đề vì mối quan hệ đơn giản giữa hai đơn vị là một calo bằng 4,18 jun. Tỷ lệ này rất hữu ích trong việc thiết lập các vấn đề yêu cầu chuyển đổi đơn vị này sang đơn vị khác.</p>
          </Panel>
          <Panel header="V. Các loại năng lượng" key="5" className='Panel'>
            <p>Năng lượng được tìm thấy dưới nhiều hình thức. Như đã đề cập ở trên, năng lượng có thể tồn tại dưới dạng nhiệt hoặc điện. Các dạng năng lượng khác là âm thanh, ánh sáng, năng lượng hóa học và năng lượng hạt nhân. Có lẽ hai dạng năng lượng quan trọng nhất trong hóa học là <i>thế năng</i> và <i>động năng</i>. Năng lượng tiềm năng là năng lượng được lưu trữ. Một ví dụ điển hình là một người giơ búa lên, sẵn sàng đóng đinh.</p>
            <p>Cái búa có khả năng rơi vào đầu móng tay. Khi chiếc búa được vung xuống và di chuyển trong không khí, thế năng được chuyển thành động năng hoặc năng lượng chuyển động. Vì toàn bộ năng lượng được bảo toàn nên thế năng tích trữ trong búa chuyển thành động năng. Khi nhấc búa lên để đập vào chiếc đinh lần nữa, chuyển động của búa hướng lên trên sẽ trở thành thế năng dự trữ cho cú đập tiếp theo vào đầu đinh. Một điều cần nhớ trong hóa học là thiên nhiên thích trạng thái năng lượng thấp hơn. Quy tắc này sẽ được ghi chú nhiều lần trong bài đánh giá hóa học này.</p>
          </Panel>
          <Panel header="VI. Phản ứng thu nhiệt và tỏa nhiệt" key="6" className='Panel'>
            <p>Năng lượng cũng có thể được hấp thụ hoặc giải phóng trong một phản ứng. Khi năng lượng giải phóng nhiều hơn năng lượng hấp thụ thì phản ứng được gọi là <i>phản ứng tỏa nhiệt</i>. Khi năng lượng được hấp thụ nhiều hơn năng lượng giải phóng, phản ứng được gọi là <i>phản ứng thu nhiệt</i>. Có thể sử dụng biểu đồ thế năng để vẽ đồ thị những thay đổi này như trong Hình 1.1.</p>
            <p>Tỏa nhiệt—năng lượng được giải phóng nhiều hơn năng lượng được hấp thụ.
            <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            A + B → C + D + Nhiệt
            <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            Thu nhiệt—năng lượng được hấp thụ nhiều hơn năng lượng giải phóng.
            <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            A + B +  Nhiệt → C + D
            <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            Lưu ý rằng năng lượng luôn được hấp thụ và giải phóng trong một phản ứng. Lượng tương đối là nguyên nhân gây ra phản ứng thu nhiệt hoặc tỏa nhiệt. Ngoài ra, cần có năng lượng để bắt đầu phản ứng. Đây được gọi là <i>năng lượng kích hoạt</i> (Ea).
            <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            Cuối cùng, hãy chú ý đến sự khác biệt về năng lượng của <i>chất phản ứng</i> và <i>sản phẩm</i>.
            <br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            Sự thay đổi năng lượng của chất phản ứng hoặc sản phẩm được gọi là <i>nhiệt của phản ứng</i>. Điều này được ký hiệu bằng ký hiệu ΔH. Biểu tượng này tượng trưng cho sự thay đổi năng lượng nhiệt, hoặc <i>entanpy</i>. Cách đơn giản để ghi nhớ cách tính sự thay đổi entanpy là sử dụng công cụ ghi nhớ này:
            <br/> 
            ΔH = thế năng của sản phẩm trừ đi thế năng của chất phản ứng
            <br/>
            hoặc
            <br/>
            ΔH = PEP − PER (delta H bằng “hạt tiêu”)
            <br/>
            </p>
            <img alt="Hình 1.1 Hai sơ đồ thế năng" src={Hinhchapter1} className="Hinhchapter"></img>
            <br/><b>Hình 1.1 Hai sơ đồ thế năng</b>
            <p>Khi ΔH có giá trị dương, phản ứng được gọi là phản ứng thu nhiệt (nhập nhiệt). Khi ΔH có giá trị âm, phản ứng được cho là tỏa nhiệt (tỏa nhiệt).</p>
            <p><b>Đặt vấn đề:</b> Trong một phản ứng, thế năng của các chất phản ứng là 150 jun/mol và thế năng của các sản phẩm là 400 jun/mol. Nhiệt của phản ứng cho phản ứng này là gì? Điều này chứng tỏ một quá trình thu nhiệt hay tỏa nhiệt?</p>
            <p><b>Giải pháp:</b> Sử dụng PEP − PER! ΔH = 400 jun/mol − 150 jun/mol = +250 jun/mol. Vì dấu dương nên phản ứng là thu nhiệt.</p>
          </Panel>
        </Collapse>
      </div>
    </div>  
  );
}

export default Chapter1thongtin;