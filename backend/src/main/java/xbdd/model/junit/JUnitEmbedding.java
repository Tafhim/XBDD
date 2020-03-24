package xbdd.model.junit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JUnitEmbedding {
	String data;
	String mime_type;

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getMime_type() {
		return mime_type;
	}

	public void setMime_type(String mime_type) {
		this.mime_type = mime_type;
	}
}
