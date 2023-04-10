import sys
import requests
import qdarkstyle
from PySide6.QtCore import Qt, QUrl, QSize
from PySide6.QtGui import QPixmap
from PySide6.QtNetwork import QNetworkAccessManager, QNetworkRequest
from PySide6.QtWidgets import QApplication, QLabel, QLineEdit, QMainWindow, QVBoxLayout, QWidget, QStyleFactory, QPushButton


class MainWindow(QMainWindow):

    def __init__(self):
        super().__init__()
        
        url = sys.argv[1]
        
        self.setWindowTitle("Captcha")
        self.setFixedSize(QSize(260, 280))
        
        self.init_central_widget()
        self.init_title()
        self.init_button()    

        self.label = QLabel()

        self.manager = QNetworkAccessManager(self)

        request = QNetworkRequest(QUrl(url))
        self.reply = self.manager.get(request)
        self.reply.finished.connect(self.handle_image)    

        self.vbox.addWidget(self.label)

        self.line_edit = QLineEdit()
        self.line_edit.setPlaceholderText("Insert the code")
        self.line_edit.returnPressed.connect(self.on_button_clicked)

    
        self.vbox.addWidget(self.line_edit)
        self.vbox.addWidget(self.button)

    def init_central_widget(self):
        self.central_widget = QWidget()
        self.central_widget.setStyleSheet("""
            background-color: #18191e;
            """)
        self.setCentralWidget(self.central_widget)
        self.vbox = QVBoxLayout(self.central_widget)
    
    def init_button(self):
        self.button = QPushButton("Done")
        self.button.setStyleSheet('''
            QPushButton {
                border-radius: 10px;
                background-color: #7F7F7F;
                color: white;
            }
        
            QPushButton:hover {
                background-color: #7F7F7F;
            }
        
            QPushButton:pressed {
                background-color: #2E562E;
            }
        ''')
        self.button.clicked.connect(self.on_button_clicked)

    
    def init_title(self):
        self.title = QLabel("Verify Captcha")
        self.title.setAlignment(Qt.AlignCenter)
        self.title.setStyleSheet("""
        background-color: #18191e;
        color: #FFFFFF;
        font-family: ProximaNovaCond, arial;
        font-size: 20px;
        font-weight: 700;
        margin: 10px, auto;
        padding: 0;
        """)
        self.vbox.addWidget(self.title)
        
     
    def handle_image(self):
        pixmap = QPixmap()
        pixmap.loadFromData(self.reply.readAll())
        self.label.setPixmap(pixmap)
        self.label.setAlignment(Qt.AlignCenter)

    def on_button_clicked(self):
        captcha = self.line_edit.text()
        sys.stdout.write(captcha)
        sys.stdout.flush()
        QApplication.quit()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyleSheet(qdarkstyle.load_stylesheet())
    app.setStyle(QStyleFactory.create("Fusion"))
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
