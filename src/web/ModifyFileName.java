package web;

import java.io.File;

public class ModifyFileName {
	
	public static void main(String[] args) {
		String path = "E:\\CMMI3\\CMMI3��ѵ\\�㶫ï��Ӧ������ϵͳ\\��Ʒ��\\���ձ���";
		
		File file = new File(path);
		String p = "�㶫ï����Ӧ������ϵͳ";
		if(file.isDirectory()){
			File[] files = file.listFiles();
			for(int i=0;i<files.length;i++){
				String name = files[i].getName();
				String s = name.split("-")[1];
				p += s;
				File f = new File(path + p);
				System.out.println(f);
			}
		}
	}
}
