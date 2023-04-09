import sys
import requests
from PySide6.QtCore import Qt, QUrl, QSize
from PySide6.QtGui import QPixmap
from PySide6.QtNetwork import QNetworkAccessManager, QNetworkRequest
from PySide6.QtWidgets import QApplication, QLabel, QLineEdit, QMainWindow, QVBoxLayout, QWidget, QStyleFactory, QPushButton
import qdarkstyle

class MainWindow(QMainWindow):

    def __init__(self):
        super().__init__()
        self.setWindowTitle("Enter the image code here")
        self.setFixedSize(QSize(300, 200))

        central_widget = QWidget()
        self.setCentralWidget(central_widget)

        vbox = QVBoxLayout(central_widget)

        self.label = QLabel()

        self.manager = QNetworkAccessManager(self)
        url = sys.argv[1]

        request = QNetworkRequest(QUrl(url))
        self.reply = self.manager.get(request)
        self.reply.finished.connect(self.handle_image)

        vbox.addWidget(self.label)

        self.line_edit = QLineEdit()
        self.line_edit.returnPressed.connect(self.update_image)

        self.button = QPushButton("Send")
        self.button.clicked.connect(self.on_button_clicked)
        vbox.addWidget(self.line_edit)
        vbox.addWidget(self.button)

    def handle_image(self):
        pixmap = QPixmap()
        pixmap.loadFromData(self.reply.readAll())
        pixmap = pixmap.scaled(pixmap.width()*1.2, pixmap.height()*1.2, Qt.KeepAspectRatio)
        self.label.setPixmap(pixmap)
        self.label.setAlignment(Qt.AlignCenter)

    def update_image(self):
        url = self.line_edit.text()
        request = QNetworkRequest(QUrl(url))
        self.reply = self.manager.get(request)
        self.reply.finished.connect(self.handle_image)

    def on_button_clicked(self):
        captcha = self.line_edit.text()
        sys.stdout.write(captcha)
        sys.stdout.flush()
        sys.exit(app.exec())
        

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyleSheet(qdarkstyle.load_stylesheet())
    app.setStyle(QStyleFactory.create("Fusion"))
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
